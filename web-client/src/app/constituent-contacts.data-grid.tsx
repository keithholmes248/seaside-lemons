import { Avatar, Box, Button } from "@mui/material";
import React from "react";
import {
  DataGrid,
  GridAddIcon,
  GridCallbackDetails,
  GridColDef,
  GridFilterModel,
  GridPaginationModel,
  GridRenderCellParams,
  GridSortModel,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { ConstituentContactFormModal } from "./constituent-contact.form-modal";
import { ConstituentContact, searchConstituentContacts } from "@/api-client/search-constituent-contacts";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { ExportContactsModal } from "./export-contact.modal";

export function nameToHslColor(name: string, saturation: number, lightness: number): string {
  let hash = 0;
  for (let i = 0; i < name?.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = Math.abs(hash) % 360;
  return "hsl(" + hue + ", " + saturation + "%, " + lightness + "%)";
}

export function nameInitials(givenName: string, familyName?: string): string {
  return `${givenName.charAt(0).toUpperCase()}${familyName?.charAt(0)?.toUpperCase() || ""}`;
}

function ContactNameAvatar(props: GridRenderCellParams<ConstituentContact>): React.ReactElement {
  const { row } = props;
  const fullName = `${row?.givenName} ${row?.familyName}`;
  const initials = nameInitials(row.givenName, row.familyName);
  return (
    <Box display="flex" alignItems="center" justifyContent="center" sx={{ width: "100%", height: "100%" }}>
      <Avatar sx={{ width: 36, height: 36, backgroundColor: nameToHslColor(fullName, 80, 35) }}>{initials}</Avatar>
    </Box>
  );
}

interface ConstituentContactDataGridToolbarProps {
  newContactAdded: () => void;
}

export interface ConstituentContactGridData extends ConstituentContact {
  avatar?: any;
}

export interface ConstituentContactDataGridProps {}

export function ConstituentContactsDataGrid(props: ConstituentContactDataGridProps): React.ReactElement {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [pageRowData, setPageRowData] = React.useState<ConstituentContact[]>([]);
  const [rowCount, setRowCount] = React.useState<number>();

  const paginationPageSizeOption = [10, 20, 50, 100];
  const [paginationModel, setPaginationModel] = React.useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  function resetToPageZero() {
    const newPaginationModel = {
      page: 0,
      pageSize: paginationModel.pageSize,
    };
    setPaginationModel(newPaginationModel);
  }
  function handlePaginationChange(model: GridPaginationModel, details: GridCallbackDetails): void {
    setPaginationModel(model);
  }

  const [textFilter, setTextFilter] = React.useState<string>();
  function handleFilterChange(model: GridFilterModel, details: GridCallbackDetails<"filter">): void {
    resetToPageZero();
    const newTextFilter = model.quickFilterValues && model.quickFilterValues.join(" ");
    setTextFilter(newTextFilter);
  }

  const [sortModel, setSortModel] = React.useState<GridSortModel>([]);
  function handleSortChange(model: GridSortModel, details: GridCallbackDetails): void {
    resetToPageZero();
    setSortModel(model);
  }

  async function searchContacts(): Promise<void> {
    setIsLoading(true);

    let orderByField: "givenName" | "familyName" | "email" | undefined = undefined;
    let orderByDirection: "asc" | "desc" | undefined = undefined;

    if (sortModel && sortModel.length > 0) {
      orderByField = sortModel[0].field as any;
      orderByDirection = sortModel[0].sort as any;
    }

    const responseBody = await searchConstituentContacts(paginationModel.page, paginationModel.pageSize, orderByField, orderByDirection, textFilter);
    setIsLoading(false);
    setPageRowData(responseBody.results || []);
    setRowCount(responseBody.count);
  }

  const columnDefinitions: GridColDef<ConstituentContactGridData>[] = [
    { field: "avatar", renderCell: ContactNameAvatar, headerName: "Avatar" },
    { field: "givenName", headerName: "Given Name", minWidth: 150 },
    { field: "familyName", headerName: "Family Name", minWidth: 150 },
    { field: "email", headerName: "Email", minWidth: 200 },
  ];

  function ConstituentContactDataGridToolbar() {
    const [showExportModal, setShowExportModal] = React.useState<boolean>(false);
    const [showConstituentFormModal, setShowConstituentFormModal] = React.useState<boolean>(false);

    const handleExportClick: React.MouseEventHandler<HTMLButtonElement> = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      setShowExportModal(true);
    };

    const handleAddContactClick: React.MouseEventHandler<HTMLButtonElement> = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      setShowConstituentFormModal(true);
    };

    const handleCloseModal = () => {
      setShowExportModal(false);
      setShowConstituentFormModal(false);
    };

    const handleNewContactAdded = () => {
      resetToPageZero();
      searchContacts();
      handleCloseModal();
    };

    return (
      <GridToolbarContainer>
        <GridToolbarQuickFilter sx={{ ml: "10px", mt: "6px" }} />
        <Box sx={{ flexGrow: 1 }} />
        <Button onClick={handleExportClick} startIcon={<FileDownloadIcon />}>
          Export
        </Button>
        <Button onClick={handleAddContactClick} startIcon={<GridAddIcon />}>
          Add Contact
        </Button>

        {showExportModal && <ExportContactsModal onCancelled={handleCloseModal} />}
        {showConstituentFormModal && <ConstituentContactFormModal onCancelled={handleCloseModal} onSubmitted={handleNewContactAdded} />}
      </GridToolbarContainer>
    );
  }

  function handleSearchParamChanges(): void {
    searchContacts();
  }
  React.useEffect(handleSearchParamChanges, [paginationModel, sortModel, textFilter]);

  function handleFirstRender(): void {
    searchContacts();
  }
  React.useEffect(handleFirstRender, []);

  return (
    <DataGrid<ConstituentContactGridData>
      columns={columnDefinitions}
      rows={pageRowData}
      rowCount={rowCount}
      getRowId={(row) => row.email}
      autosizeOnMount={true}
      slots={{ toolbar: ConstituentContactDataGridToolbar }}
      loading={isLoading}
      slotProps={{
        loadingOverlay: {
          variant: "skeleton",
          noRowsVariant: "skeleton",
        },
      }}
      sortingMode="server"
      onSortModelChange={handleSortChange}
      pagination={true}
      paginationMode="server"
      paginationModel={paginationModel}
      pageSizeOptions={paginationPageSizeOption}
      onPaginationModelChange={handlePaginationChange}
      filterMode="server"
      onFilterModelChange={handleFilterChange}
      filterDebounceMs={400}
    />
  );
}
