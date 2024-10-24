import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const users = [
  { id: 1, name: "User 1", avatar: "/Image.png" },
  { id: 2, name: "User 2", avatar: "/Image (1).png" },
  { id: 3, name: "User 3", avatar: "/Image (2).png" },
  { id: 4, name: "User 4", avatar: "/Image (3).png" },
];

export default function UserAvatarRow() {
  return (
    <div className="flex -space-x-4 ml-10">
      {users.map((user, index) => (
        <Avatar key={user.id} className={`w-10 h-10 border-2 border-background ${index > 0 ? 'hover:translate-x-1' : ''}`}>
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
}