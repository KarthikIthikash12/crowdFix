const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
    {
        photo: {
            type: String,
            required: true 
        },
        location: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }, 
        upvotes: {
            type: Number,
            default: 0
        },
        resolved: {
            type: Boolean,
            default: false
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User",
            required: true
        }, 
        upvotedBy: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ]
    },
    {
        timestamps: true
    }
); 

issueSchema.index({ createdAt: -1});
issueSchema.index({ upvotes: -1});
issueSchema.index({ location: "text", description: "text"}); 

const Issue = mongoose.model("Issue", issueSchema);
module.exports = Issue; 