import { Card, CardContent, Typography } from "@mui/material";

export default function PollCard({ poll }: { poll: any }) {
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 2,
        boxShadow: 1,
        transition: "0.3s",
        "&:hover": { boxShadow: 4 },
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight="600">
          {poll.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {poll.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
