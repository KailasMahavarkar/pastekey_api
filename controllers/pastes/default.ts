import { timeArray, timeSpanType } from "@/utils/timing";
import Ajv, { JSONSchemaType } from "ajv";
import {
	privacyType,
	adType,
	privacyArray,
	categoryArray,
	adTypeArray,
	categoryType,
	statusType,
	statusArray,
    programmingLanguagesArray,
    programmingLanguagesType,
} from "@/types/types";
const ajv = new Ajv();


interface basePasteSchema {
    status: statusType;
	privacy: privacyType;
	category: string;
	title: string;
	note: string;
	data: string[];
	maxViews: number;
	eseed: string;
	vseed: string;
	tag: string;
	adType: adType;
	expiry: timeSpanType;
	options: any;
    language: programmingLanguagesType
}

interface serverPasteCreateInterface extends basePasteSchema {
	vct: any;
	ect: any;
	password: string;
	masterkey: string;
}

interface clientPasteCreateInterface extends basePasteSchema {
	eseed: string;
	vseed: string;
	ect: string;
	vct: string;
}

const baseCreateProps = {
	tag: { type: "string" },
	title: { type: "string", maxLength: 70 },
	privacy: {
		type: "string",
		enum: privacyArray,
	},
    status: {
        type: "string",
        enum: statusArray,
    },
	note: {
		type: "string",
		maxLength: 500,
	},
	category: { type: "string", enum: categoryArray },
	maxViews: { type: "number" },
	expiry: {
		type: "string",
		enum: timeArray,
	},
	data: {
		type: "array",
	},
	adType: { type: "string", enum: adTypeArray },
    language: { type: "string", enum: programmingLanguagesArray},
};

// @ts-ignore
const clientPasteCreateSchema: JSONSchemaType<clientPasteCreateInterface> = {
	type: "object",
	nullable: false,
	properties: {
		...baseCreateProps,
		eseed: {
			type: "string",
			minLength: 64,
			maxLength: 64,
		},
		vseed: {
			type: "string",
			minLength: 64,
			maxLength: 64,
		},
		ect: { type: "string" },
		vct: { type: "string" },
	},
	required: ["tag", "eseed", "vseed", "ect", "vct"],
};

// @ts-ignore
const serverPasteCreateSchema: JSONSchemaType<serverPasteCreateInterface> = {
	type: "object",
	properties: {
		...baseCreateProps,
		password: { type: "string" },
		masterkey: { type: "string" },
	},
};

// UPDATE
interface baseUpdateInterface {
	tag: string;
	updateProps: {
		title: string;
		category: categoryType;
		data: string[];
		status: statusType;

		// token
		vseed: string;
		vct: string;
		password: string;
		// extra
		adType: adType;

        // language
        language: programmingLanguagesType
	};
	eseed: string;
	password: string;
	masterkey: string;
}

// @ts-ignore
const updateSchema: JSONSchemaType<baseUpdateInterface> = {
	type: "object",
	properties: {
		tag: { type: "string" },
		masterkey: { type: "string" },
		eseed: { type: "string" },
		password: { type: "string" },
		updateProps: {
			type: "object",
			properties: {
				// base
				title: { type: "string" },
				category: { type: "string", enum: categoryArray },
				data: { type: "array" },
				status: { type: "string", enum: statusArray },

				// token
				vseed: { type: "string" },
				vct: { type: "string" },
				password: { type: "string" },

				// extra
				adType: { type: "string", enum: adTypeArray },

                // language
                language: { type: "string", enum:  programmingLanguagesArray},
			},
		},
	},
	required: ["tag"],
};

interface baseDeleteInterface {
	tag: string;
	eseed: string;
	masterkey: string;
}

const deleteSchema: JSONSchemaType<baseDeleteInterface> = {
	type: "object",
	properties: {
		tag: { type: "string" },
		eseed: { type: "string" },
		masterkey: { type: "string" },
	},
	required: ["tag", "eseed"],
};

export const validateClientPasteCreate =
	ajv.compile<clientPasteCreateInterface>(clientPasteCreateSchema);
export const validateServerPasteCreate =
	ajv.compile<serverPasteCreateInterface>(serverPasteCreateSchema);

export const validatePasteUpdate =
	ajv.compile<baseUpdateInterface>(updateSchema);

export const validatePasteDelete =
	ajv.compile<baseDeleteInterface>(deleteSchema);
