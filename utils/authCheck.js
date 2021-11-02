// import jwt from "jwt-simple";
// import moment from "moment";

// const check = async (req, res, next) => {
//   console.log(req.headers.authorization);
//   try {
//     if (process.env.NODE_ENV !== "development") {
//       if (
//         req.path.indexOf("/login") == -1 &&
//         req.path.indexOf("/signup") == -1 &&
//         req.path.indexOf("/sns-login") == -1 &&
//         req.path.indexOf("/sns-signup") == -1 &&
//         req.path.indexOf("/duple-email") == -1
//       ) {
//         // token 검증
//         const accessKey = req.headers.authorization.replace("Bearer ", "");

//         if (accessKey === undefined) {
//           throw new Error("need token");
//         }

//         const decoded = jwt.decode(accessKey, "aimmo");
//         console.log(decoded.key);
//         const dateNow = moment().format("x");
//         const { dateLimit } = decoded;

//         // 유효기간 체크
//         if (dateLimit < dateNow) {
//           throw new Error("expire limit time");
//         }

//         req._id = decoded.key;
//         // console.log(req._id);
//       }
//     }
//     return next();
//   } catch (err) {
//     console.log(err);
//     const result = { result: false, err: "1", msg: "auth fail" };
//     res.json(result);
//   }
// };

// export default { check };
