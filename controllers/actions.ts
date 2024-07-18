export const PASTE = {
	// unknowns
	CREDENTIAL_ERROR: "Paste Credentials are incorrrect",
    CLAIM_TOKEN_INVALID: "Paste claim token is invalid",
    CLAIM_TOKEN_MISMATCH: "Paste claim token does not match",
	LATEST_VERSION: "Paste already updated with latest version",
	PASSWORD_INCORRECT: "Paste Password is incorrect",
    MAX_ATTEMPTS: "Maximum attempts reached",
    MAX_VIEW_LIMIT: "Maximum views reached",
    PASTE_NOT_FOUND: "No pastes found",
    META_SUCCESS: "Successfully fetched pastes meta",
    TAG_EXISTS: "Paste tag already taken",
    TAG_INVALID: "Paste tag is invalid",
    TAG_AVAILABLE: "Paste tag is available",
    INVALID_DECRYPTION_KEY: "Invalid decryption key",
    INVALID_MASTERKEY_SEED: "Invalid masterkey seed",


    // tabs
    TAB_HASH_MISSING: "Paste tab hash is missing",
    TAB_SIZE_MISSING: "Paste tab size is missing",
    TAB_DATA_MISSING: "Paste tab data is missing",
    TAB_DATA_INVALID: "Paste tab data is invalid type",
    TAB_DATA_INVALID_SIZE: "Paste tabdata is invalid size",
    TAB_DATA_INVALID_HASH: "Paste tabhash is invalid hash",


	// paste required
	TAG_REQUIRED: "Paste tag is required",
	TITLE_REQUIRED: "Paste title is required",
	DATA_REQUIRED: "Paste data is required",
	PRIVACY_REQUIRED: "Paste privacy is required",
	CATEGORY_REQUIRED: "Paste category is required",
	EXPIRY_REQUIRED: "Paste expiry is required",
	MAXVIEWS_REQUIRED: "Paste maxViews is required",
	ADTYPE_REQUIRED: "Paste adType is required",
	MASTERKEY_REQUIRED: "Paste masterkey is required",
	MASTERKEY_CHECK: "Paste masterkey is invalid or empty",


    
	// paste type checks
	TAG_TYPE: `Paste tag is invalid type`,
	TITLE_TYPE: "Paste title is invalid type",
	DATA_TYPE: "Paste data is invalid type",
    
    DATA_MAP_INVALID: "Paste map is invalid type",
    DATA_SIZE_MAP_INVALID: "Paste size map is invalid type",
    HASHES_MAP_INVALID: "Paste hashes map is invalid type",

    PASTE_TAB_COUNT_INVALID: "Paste tab count is invalid type",
	PRIVACY_TYPE: "Paste privacy is invalid type",
	CATEGORY_TYPE: "Paste category is invalid type",
	EXPIRY_TYPE: "Paste expiry is invalid type",
	MAXVIEWS_TYPE: "Paste maxViews is invalid type",
	ADTYPE_TYPE: "Paste adType is invalid type",
	MASTERKEY_TYPE: "Paste masterkey is invalid type",

	// paste type undefined
	TAG_UNDEFINED: `Paste tag is undefined`,
	TITLE_UNDEFINED: "Paste title is undefined",
	DATA_UNDEFINED: "Paste data is undefined",
	PRIVACY_UNDEFINED: "Paste privacy is undefined",
	CATEGORY_UNDEFINED: "Paste category is undefined",
	EXPIRY_UNDEFINED: "Paste expiry is undefined",
	MAXVIEWS_UNDEFINED: "Paste maxViews is undefined",
	ADTYPE_UNDEFINED: "Paste adType is undefined",
	MASTERKEY_UNDEFINED: "Paste masterkey is undefined",
    EXPIRY_RECENTLY_UPDATED: "Paste expiry recently updated",

	// paste tag expired
	TAG_EXPIRED: `Paste tag is expired`,

	// paste CRUD
	CREATE_SUCCESS: "Paste created successfully",
	CREATE_FAILED: "Paste creation failed",
	CREATE_ID_FAILED: "Paste ID creation failed",
    CREATE_EXITED: "Paste creation exited",

	READ_SUCCESS: "Paste read successfully",
	READ_FAILED: "Paste read failed",
    READ_EXITED: "Paste read exited",

	UPDATE_SUCCESS: "Paste updated successfully",
	UPDATE_FAILED: "Paste update failed",
    UPDATE_EXITED: "Paste update exited",

	DELETE_FAILED: "Paste deleted failed",
	DELETE_SUCCESS: "Paste deleted successfully",
    DELETE_EXITED: "Paste delete exited",

	CREATE_MAX_SIZE_EXCEEED: `Paste exceed maximum allowed size`,

	SERVER_ERROR: "Server Error",
	DATABASE_ERROR: "Database Error",
	// argument dependent functions
	PASTE_TAG_UNDEFINED: (tag) => `Paste tag ${tag} is undefined`,
	PASTE_TAG_DOES_NOT_EXIST: (tag) => `Paste tag ${tag} does not exists`,
	PASTE_TAG_EXPIRED: (tag) => `Paste tag ${tag} is expired`,
	PASTE_TAG_OWNER: (tag, username) =>
		`Paste ${tag} is not owned by user ${username}`,
};