import { createSchema, Type, typedModel, ExtractDoc } from "ts-mongoose";
import { adTypeArray, categoryArray, privacyArray, programmingLanguagesArray, statusArray } from "@/types/types";
import { timeArray } from "@/utils/timing";

const countrySchema = createSchema({
    ca: Type.number({ required: true }),
    au: Type.number({ required: true }),
    uk: Type.number({ required: true }),
    us: Type.number({ required: true }),
    in: Type.number({ required: true }),
    id: Type.number({ required: true }),
    np: Type.number({ required: true }),
    pk: Type.number({ required: true }),
    bd: Type.number({ required: true }),
    fr: Type.number({ required: true }),
    ww: Type.number({ required: true }),
});

const countryDefault = {
    ca: 0,
    au: 0,
    uk: 0,
    us: 0,
    in: 0,
    id: 0,
    np: 0,
    pk: 0,
    bd: 0,
    fr: 0,
    ww: 0,
};

const pasteSchema = createSchema(
    {
        _id: Type.string({
            required: false
        }),

        // basic info
        title: Type.string({ required: true, default: "Untitled" }),
        privacy: Type.string({
            required: false,
            enum: privacyArray,
            default: "public",
        }),
        owner: Type.string({ required: true, default: "member" }),
        category: Type.string({ enum: categoryArray }),
        data: Type.array({ required: true, default: [] }).of(Type.string()),
        size: Type.number({ required: true, default: 0 }),
        maxviews: Type.number({ required: false, default: 100000000 }),
        note: Type.string({ required: true, default: "add note" }),

        // security
        eseed: Type.string({ required: false, default: "" }),
        vseed: Type.string({ required: false, default: "" }),
        ect: Type.string({ required: false, default: "" }),
        vct: Type.string({ required: false, default: "" }),

        // array of programming languages -> cpp, java, python, etc
        language: Type.string({ required: false, enum: programmingLanguagesArray, default: "text" }),

        // settings
        adtype: Type.string({
            required: false,
            enum: adTypeArray,
            default: "medium",
        }),
        expiry: Type.string({
            required: false,
            enum: timeArray,
            default: "5 years",
        }),
        status: Type.string({
            required: true,
            enum: statusArray,
            default: "active",
        }),


        // timestamps
        createdAt: Type.number({
            required: true,
            default: Date.now()
        }),
        updateAt: Type.number({
            required: true,
            default: Date.now(),
        }),
        expireAt: Type.number({
            required: false,
            default: Date.now() + 157680000000
        }),

        // analytics
        country: Type.object({
            required: false,
            default: countryDefault,
        }).of(countrySchema),

        // views
        paidViews: Type.number({ required: true, default: 0 }),
        uniqueViews: Type.number({ required: true, default: 0 }),
        totalViews: Type.number({ required: true, default: 0 }),

        // earnings
        paidEarnings: Type.number({ required: true, default: 0 }),
        unpaidEarnings: Type.number({ required: true, default: 0 }),

        // reports
        reportedCount: Type.number({ required: true, default: 0 }),

        // reportedMap
        reportedMap: Type.object({ required: false, default: {} }).of(Type.string()),

        // version
        version: Type.number({ required: true, default: 1 }),
    }
);


export type PasteDocumentType = ExtractDoc<typeof pasteSchema>;


const PasteModel = typedModel("Paste", pasteSchema);
export default PasteModel;
