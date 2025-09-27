import React from "react";
import { Button, TextField, Box, Typography } from "@mui/material";

const OTP = () => {
  return (
    <Box className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-2 md:px-8">
      <Typography
        variant="h5"
        className="mb-6 font-bold text-center"
        sx={{ fontSize: { xs: 22, md: 28 }, color: "primary.main" }}
      >
        رمز التحقق OTP
      </Typography>
      <Box className="w-full max-w-xs bg-white rounded-lg shadow-md p-4">
        <TextField
          label="أدخل الرمز"
          variant="outlined"
          fullWidth
          className="mb-4"
          sx={{ fontSize: { xs: 14, md: 18 } }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ py: 1.2, fontSize: { xs: 14, md: 18 } }}
        >
          تأكيد
        </Button>
      </Box>
    </Box>
  );
};

export default OTP;
