import React from "react";
import { Button, Box, Typography } from "@mui/material";

const IdentityVerification = () => {
  return (
    <Box className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-2 md:px-8">
      <Typography
        variant="h5"
        className="mb-6 font-bold text-center"
        sx={{ fontSize: { xs: 22, md: 28 }, color: "primary.main" }}
      >
        تحقق من الهوية
      </Typography>
      <Box className="w-full max-w-xs bg-white rounded-lg shadow-md p-4">
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className="mb-2"
          sx={{ py: 1.2, fontSize: { xs: 14, md: 18 } }}
        >
          رفع صورة سيلفي
        </Button>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          sx={{ py: 1.2, fontSize: { xs: 14, md: 18 } }}
        >
          رفع صورة البطاقة
        </Button>
      </Box>
    </Box>
  );
};

export default IdentityVerification;
