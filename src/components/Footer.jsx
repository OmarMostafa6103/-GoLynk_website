// import React from "react";
// import {
//   Box,
//   Typography,
//   Container,
//   Grid,
//   Link as MuiLink,
//   Divider,
//   IconButton,
//   TextField,
//   Button,
// } from "@mui/material";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import YouTubeIcon from "@mui/icons-material/YouTube";
// import EmailIcon from "@mui/icons-material/Email";
// import PhoneIcon from "@mui/icons-material/Phone";
// import LocationOnIcon from "@mui/icons-material/LocationOn";

// const Footer = () => (
//   <Box
//     component="footer"
//     sx={{
//       bgcolor: "#0b1220",
//       color: "#e5e7eb",
//       width: "100%",
//       position: "fixed", // ثابت أسفل الصفحة
//       bottom: 0,
//       left: 0,
//       right: 0,
//       zIndex: 1000,
//       py: 3,
//       boxShadow: "0 -2px 10px rgba(0,0,0,0.3)", // ظل علوي بسيط
//     }}
//   >
//     {/* الخط العلوي المتدرج */}
//     <Box
//       sx={{ height: 4, background: "linear-gradient(90deg,#0ea5e9,#2563eb)" }}
//     />

//     <Container
//       maxWidth={false}
//       disableGutters
//       sx={{
//         px: { xs: 3, md: 6 },
//         maxWidth: "1200px",
//         margin: "0 auto",
//       }}
//     >
//       <Grid container spacing={4} alignItems="flex-start">
//         {/* العمود الأول */}
//         <Grid item xs={12} md={3}>
//           <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
//             GoLynk
//           </Typography>
//           <Typography variant="body2" sx={{ color: "#94a3b8", mb: 2 }}>
//             منصة موحدة لإدارة الخرائط والطلبات والشات والإشعارات بسهولة وسرعة مع
//             دعم كامل للغة العربية وRTL.
//           </Typography>
//           <Box sx={{ display: "flex", gap: 1 }}>
//             <IconButton size="small" color="inherit" aria-label="Facebook">
//               <FacebookIcon fontSize="small" />
//             </IconButton>
//             <IconButton size="small" color="inherit" aria-label="Twitter">
//               <TwitterIcon fontSize="small" />
//             </IconButton>
//             <IconButton size="small" color="inherit" aria-label="Instagram">
//               <InstagramIcon fontSize="small" />
//             </IconButton>
//             <IconButton size="small" color="inherit" aria-label="YouTube">
//               <YouTubeIcon fontSize="small" />
//             </IconButton>
//           </Box>
//         </Grid>

//         {/* العمود الثاني */}
//         <Grid item xs={12} sm={6} md={3}>
//           <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
//             روابط سريعة
//           </Typography>
//           <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
//             <MuiLink href="/home" color="inherit" underline="hover">
//               الرئيسية
//             </MuiLink>
//             <MuiLink href="/map" color="inherit" underline="hover">
//               الخريطة
//             </MuiLink>
//             <MuiLink href="/orders" color="inherit" underline="hover">
//               الأوردرات
//             </MuiLink>
//             <MuiLink href="/chat" color="inherit" underline="hover">
//               الشات
//             </MuiLink>
//           </Box>
//         </Grid>

//         {/* العمود الثالث */}
//         <Grid item xs={12} sm={6} md={3}>
//           <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
//             تواصل معنا
//           </Typography>
//           <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//               <EmailIcon sx={{ color: "#93c5fd" }} fontSize="small" />
//               <Typography variant="body2">support@golynk.app</Typography>
//             </Box>
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//               <PhoneIcon sx={{ color: "#93c5fd" }} fontSize="small" />
//               <Typography variant="body2">+20 100 000 0000</Typography>
//             </Box>
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//               <LocationOnIcon sx={{ color: "#93c5fd" }} fontSize="small" />
//               <Typography variant="body2">القاهرة، مصر</Typography>
//             </Box>
//           </Box>
//         </Grid>

//         {/* العمود الرابع */}
//         <Grid item xs={12} md={3}>
//           <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
//             اشترك بالنشرة البريدية
//           </Typography>
//           <Box
//             component="form"
//             onSubmit={(e) => e.preventDefault()}
//             sx={{ display: "flex", gap: 1 }}
//           >
//             <TextField
//               fullWidth
//               size="small"
//               placeholder="أدخل بريدك الإلكتروني"
//               inputProps={{ dir: "rtl" }}
//               sx={{ bgcolor: "#0f172a", borderRadius: 1 }}
//             />
//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               sx={{ whiteSpace: "nowrap", fontWeight: 700 }}
//             >
//               اشتراك
//             </Button>
//           </Box>
//         </Grid>
//       </Grid>

//       <Divider sx={{ my: 2, borderColor: "#122036" }} />

//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: { xs: "column", md: "row" },
//           alignItems: "center",
//           justifyContent: "space-between",
//           gap: 2,
//         }}
//       >
//         <Typography variant="body2">
//           © {new Date().getFullYear()} GoLynk. جميع الحقوق محفوظة.
//         </Typography>
//         <Box sx={{ display: "flex", gap: 2 }}>
//           <MuiLink href="#" color="inherit" underline="hover">
//             الشروط
//           </MuiLink>
//           <MuiLink href="#" color="inherit" underline="hover">
//             الخصوصية
//           </MuiLink>
//         </Box>
//       </Box>
//     </Container>
//   </Box>
// );

// export default Footer;

import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-200 w-full left-0 right-0">
      {/* الشريط العلوي المتدرج */}

      <div className="max-w-7xl mx-auto px-4 py-6 md:py-10">
        {/* الصف الأول */}
        <div className="flex flex-col md:flex-row items-center justify-between pb-6 border-b border-slate-700">
          <h4 className="text-2xl font-extrabold tracking-wide">GoLynk</h4>
          <a href="#" className="hover:underline">
            اذهب لمركز المساعدة
          </a>
        </div>

        {/* الصفوف الرئيسية */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 py-6 text-center md:text-right">
          {/* نبذة */}
          <div>
            <h6 className="text-lg font-bold mb-2">GoLynk</h6>
            <p className="text-gray-400 text-sm mb-4">
              منصة موحدة لإدارة الخرائط والطلبات والشات والإشعارات بسهولة وسرعة
              مع دعم كامل للغة العربية وRTL.
            </p>
            <div className="flex gap-2">
              <a href="#" className="hover:text-brand-300">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="hover:text-brand-300">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="hover:text-brand-300">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="hover:text-brand-300">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          {/* روابط سريعة */}
          <div>
            <h6 className="text-lg font-bold mb-2">روابط سريعة</h6>
            <ul className="space-y-1 text-sm">
              <li>
                <a href="/home" className="hover:text-brand-300">
                  الرئيسية
                </a>
              </li>
              <li>
                <a href="/map" className="hover:text-brand-300">
                  الخريطة
                </a>
              </li>
              <li>
                <a href="/orders" className="hover:text-brand-300">
                  الأوردرات
                </a>
              </li>
              <li>
                <a href="/chat" className="hover:text-brand-300">
                  الشات
                </a>
              </li>
            </ul>
          </div>

          {/* تواصل معنا */}
          <div>
            <h6 className="text-lg font-bold mb-2">تواصل معنا</h6>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 justify-end">
                support@golynk.app{" "}
                <i className="fas fa-envelope text-brand-300"></i>
              </li>
              <li className="flex items-center gap-2 justify-end">
                +20 100 000 0000 <i className="fas fa-phone text-brand-300"></i>
              </li>
              <li className="flex items-center gap-2 justify-end">
                القاهرة، مصر{" "}
                <i className="fas fa-map-marker-alt text-brand-300"></i>
              </li>
            </ul>
          </div>

          {/* النشرة البريدية */}
          <div>
            <h6 className="text-lg font-bold mb-2">اشترك بالنشرة البريدية</h6>
            <form className="flex gap-2 mb-2">
              <input
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                className="flex-1 px-3 py-2 rounded-full bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-eco-500"
                dir="rtl"
              />
              <button
                type="submit"
                className="bg-eco-600 hover:bg-eco-700 text-white px-4 py-2 rounded-full font-bold whitespace-nowrap shadow-brand"
              >
                اشتراك
              </button>
            </form>
            <p className="text-gray-400 text-xs">
              نرسل رسائل مهمة فقط. يمكنك الإلغاء في أي وقت.
            </p>
          </div>
        </div>

        {/* أسفل الفوتر */}
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-slate-700 pt-4 text-sm text-center">
          <p className="mx-auto md:mx-0">
            © {new Date().getFullYear()} GoLynk. جميع الحقوق محفوظة.
          </p>
          <div className="flex gap-4 mt-2 md:mt-0 mx-auto md:mx-0">
            <a href="#" className="hover:text-brand-300">
              الشروط
            </a>
            <a href="#" className="hover:text-brand-300">
              الخصوصية
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
