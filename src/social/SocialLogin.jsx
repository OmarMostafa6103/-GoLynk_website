import React from "react";
import { Box, Typography, Button } from "@mui/material";

const SocialLogin = () => {
  return (
    <Box
      className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4"
      sx={{
        width: "100%",
        maxWidth: 400,
        mx: "auto",
        py: { xs: 4, md: 8 },
        borderRadius: 3,
        boxShadow: { xs: 0, md: 2 },
        bgcolor: "background.paper",
      }}
    >
      <Typography
        variant="h5"
        className="mb-6 font-bold text-center"
        sx={{ fontSize: { xs: 24, md: 32 }, color: "primary.main" }}
      >
        تسجيل دخول عبر الشبكات الاجتماعية
      </Typography>
      <Box className="w-full flex flex-col gap-3" sx={{ mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ py: 1.5, fontSize: { xs: 16, md: 18 } }}
        >
          Google
        </Button>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          sx={{ py: 1.5, fontSize: { xs: 16, md: 18 } }}
        >
          Facebook
        </Button>
      </Box>
    </Box>
  );
};

export default SocialLogin;
