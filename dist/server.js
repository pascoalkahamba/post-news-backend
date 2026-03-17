"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("./routes/user.routes");
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const verificationCode_routes_1 = require("./routes/verificationCode.routes");
const category_routes_1 = require("./routes/category.routes");
const post_routes_1 = require("./routes/post.routes");
const reaction_routes_1 = require("./routes/reaction.routes");
const favorite_routes_1 = require("./routes/favorite.routes");
const comment_routes_1 = require("./routes/comment.routes");
const reply_routes_1 = require("./routes/reply.routes");
const follow_routes_1 = require("./routes/follow.routes");
const app = (0, express_1.default)();
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
app.options("*", (0, cors_1.default)(corsOptions));
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3001;
//sudo systemctl is-enabled mysql - para verificar se o servidor do mysql esta activo.
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/user", user_routes_1.userRoutes);
app.use("/verificationCode", verificationCode_routes_1.verificationCodeRoutes);
app.use("/category", category_routes_1.categoryRoutes);
app.use("/post", post_routes_1.postRoutes);
app.use("/reaction", reaction_routes_1.reactionRoutes);
app.use("/favorite", favorite_routes_1.favoriteRoutes);
app.use("/comment", comment_routes_1.commentRoutes);
app.use("/reply", reply_routes_1.replyRoutes);
app.use("/follow", follow_routes_1.followRoutes);
app.listen(port, () => {
    console.log("server running!");
});
exports.default = app;
