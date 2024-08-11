import React from "react";
import { Box, Pagination } from "@mui/material";
import { useSearch } from "../../contexts/SearchContext"; // Adjust path if needed

export default function CustomPagination() {
  const { page, setPage, search } = useSearch();
  const totalPages = Math.ceil(search.length / 10); // คำนวณจำนวนหน้า

  const handleChange = (event, value) => {
    setPage(value); // อัปเดตค่า page
  };

  return (
    <Box
      sx={{
        margin: "20px 0px",
      }}
    >
      <Pagination
        count={totalPages} // Use totalPages from context
        page={page} // Current page
        onChange={handleChange}
        shape="rounded"
        sx={{
          "& .MuiPaginationItem-root": {
            color: "#8B93B0", // General button color
            backgroundColor: "#070C1B", // General button background color
          },
          "& .Mui-selected": {
            color: "#FFFFFF", // Color of selected page number
            backgroundColor: "#21263F", // Background color of selected page
            "&:hover": {
              backgroundColor: "#21263F", // Keep the same color on hover for the selected page
            },
          },
        }}
      />
    </Box>
  );
}
