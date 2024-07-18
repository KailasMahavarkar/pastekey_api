import { createSchema, ExtractDoc, ExtractProps, Type, typedModel } from "ts-mongoose";

// whenever schema is updated
// check what is been shared with accessToken
// we should not share payment info with accessToken
// we should not share password info with accessToken

const schemas = {
	payment: createSchema(
		{
			paypal: Type.string({
				required: false,
				default: "",
			}),
			upi: Type.string({
				required: false,
				default: "",
			}),
			selected: Type.string({
				required: true,
				enum: ["paypal", "upi"],
			}),
		},
		{
			_id: false,
		}
	),

	// social schema
	social: createSchema(
		{
			facebook: Type.string({
				required: false,
				default: "",
			}),
			twitter: Type.string({
				required: false,
				default: "",
			}),
			instagram: Type.string({
				required: false,
				default: "",
			}),
			website: Type.string({
				required: false,
				default: "",
			})
		},
		{
			_id: false,
		}
	),

	pasteCounterSchema: createSchema(
		{
			// create
			pasteCreated: Type.number({ required: true }),
			pasteCreatedToday: Type.number({ required: true }),

			// read
			pasteRead: Type.number({ required: true }),
			pasteReadToday: Type.number({ required: true }),

			// update
			pasteUpdated: Type.number({ required: true }),
			pasteUpdatedToday: Type.number({ required: true }),
		},
		{
			_id: false,
		}
	),

	fileCounterSchema: createSchema(
		{
			// create
			fileCreated: Type.number({ required: true }),
			fileCreatedToday: Type.number({ required: true }),

			// read
			fileRead: Type.number({ required: true }),
			fileReadToday: Type.number({ required: true }),
		},
		{
			_id: false,
		}
	),
};

const counterSchema = createSchema(
	{
		paste: Type.object({
			required: true,
		}).of(schemas.pasteCounterSchema),
	},
	{
		_id: false,
	}
);

const UserSchema = createSchema({
	_id: Type.objectId({
		auto: true,
	}),
	username: Type.string({ required: true }),

	// profile
	fullname: Type.string({ required: false }),
	email: Type.string({ required: true }),
	apikey: Type.string({ required: true, index: true }),
	resetToken: Type.string({ required: false }),

	// password
	password: Type.string({ required: true }),
	role: Type.string({ required: true, enum: ["member", "admin"] }),
	datejoined: Type.number({ required: true }),
	pastes: Type.array({ required: false }).of(
		Type.string({ required: false })
	),

	status: Type.string({
		required: true,
		enum: ["active", "inactive", "banned", "deleted"],
	}),

	paidViews: Type.number({ required: true }),
	unpaidViews: Type.number({ required: true }),
	paidEarnings: Type.number({ required: true }),
	unpaidEarnings: Type.number({ required: true }),

	payment: Type.object({
		required: false,
		default: {
			paypal: "",
			upi: "",
			selected: "upi",
		},
	}).of(schemas.payment),

	socials: Type.object({
		required: false,
		default: {
			facebook: "",
			twitter: "",
			instagram: "",
		},
	}).of(schemas.social),

	// counter
	pasteCounter: Type.object({
		required: true,
		default: {
			pasteCreated: 0,
			pasteCreatedToday: 0,

			pasteRead: 0,
			pasteReadToday: 0,

			pasteUpdated: 0,
			pasteUpdatedToday: 0,
		},
	}).of(counterSchema),
});

// create index for apikey
const UserModel = typedModel("User", UserSchema);
export type UserDoc = ExtractDoc<typeof UserSchema>;
export type UserProps = ExtractProps<typeof UserSchema>;
 
export default UserModel;
