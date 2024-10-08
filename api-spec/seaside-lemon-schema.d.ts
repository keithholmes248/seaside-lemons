/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/users/{firebaseUserId}": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                firebaseUserId: string;
            };
            cookie?: never;
        };
        /**
         * GetUserByFirebaseUserId
         * @description Retrieve the information of the user with the matching user ID.
         */
        get: operations["GetUserByFirebaseUserId"];
        /** UpsertUser */
        put: operations["UpsertUser"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/contacts": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** SearchConstituentContacts */
        get: operations["SearchConstituentContacts"];
        put?: never;
        /** CreateConstituentContact */
        post: operations["CreateConstituentContact"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/contacts/confirm-unique-email": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** ConfirmUniqueEmailForContact */
        get: operations["ConfirmUniqueEmailForContact"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/contacts/csv-for-contacts": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** CsvForContacts */
        get: operations["csv-for-contacts"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        /** ConstituentContact */
        ConstituentContact: {
            givenName: string;
            familyName: string;
            fullName?: string;
            initials?: string;
            /** Format: email */
            email: string;
        };
        /** NewConstituentContact */
        NewConstituentContact: {
            givenName: string;
            familyName: string;
            /** Format: email */
            email: string;
        };
        /** User */
        User: {
            firebaseUserId?: string;
            firebaseDisplayName?: string;
            firebaseEmail?: string;
            firebasePhotoUrl?: string;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    GetUserByFirebaseUserId: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                firebaseUserId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description User Found */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["User"];
                };
            };
            /** @description User Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    UpsertUser: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                firebaseUserId: string;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": components["schemas"]["User"];
            };
        };
        responses: never;
    };
    SearchConstituentContacts: {
        parameters: {
            query?: {
                /** @description Adds an exact text filter against fullName */
                filter?: string;
                orderbyfield?: "givenName" | "familyName" | "email";
                orderbydirection?: "asc" | "desc";
                count?: boolean;
                page?: number;
                pagesize?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            "2XX": {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        results?: components["schemas"]["ConstituentContact"][];
                        count?: number;
                    };
                };
            };
        };
    };
    CreateConstituentContact: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": components["schemas"]["NewConstituentContact"];
            };
        };
        responses: {
            /** @description Success */
            "2XX": {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ConstituentContact"];
                };
            };
        };
    };
    ConfirmUniqueEmailForContact: {
        parameters: {
            query?: {
                /** @description email address to confirm uniquness */
                email?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            "2XX": {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        isUnique?: boolean;
                    };
                };
            };
        };
    };
    "csv-for-contacts": {
        parameters: {
            query?: {
                /** @description number of seconds since epoch */
                createdatbegin?: number;
                /** @description number of seconds since epoch */
                createdatend?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: never;
    };
}
