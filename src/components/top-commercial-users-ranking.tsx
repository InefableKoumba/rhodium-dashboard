"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, Users, Crown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GeneralAvatar } from "@/components/common/general-user-avatar";
import { User } from "@/types/types";

interface TopCommercialUsersRankingProps {
  users: {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    phoneNumber?: string;
    godsonsCount: number;
  }[];
}

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Crown className="h-6 w-6 text-yellow-500" />;
    case 2:
      return <Trophy className="h-6 w-6 text-gray-400" />;
    case 3:
      return <Medal className="h-6 w-6 text-amber-600" />;
    default:
      return <Award className="h-5 w-5 text-blue-500" />;
  }
};

const getRankBadgeColor = (rank: number) => {
  switch (rank) {
    case 1:
      return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white";
    case 2:
      return "bg-gradient-to-r from-gray-300 to-gray-500 text-white";
    case 3:
      return "bg-gradient-to-r from-amber-500 to-amber-700 text-white";
    default:
      return "bg-gradient-to-r from-blue-500 to-blue-700 text-white";
  }
};

export default function TopCommercialUsersRanking({
  users,
}: TopCommercialUsersRankingProps) {
  return (
    <Card className="dark:bg-gray-900 dark:border-gray-800 dark:text-gray-100 rounded-xl shadow">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
            <Crown className="h-6 w-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold">Top Commerciaux</CardTitle>
            <p className="text-sm text-muted-foreground">
              Classement par nombre de filleuls
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {users.length === 0 ? (
          <div className="text-center py-8">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Aucun commercial trouvé</p>
          </div>
        ) : (
          users.map((user, index) => {
            const rank = index + 1;
            return (
              <Link
                key={user.id}
                href={`/users/${user.id}`}
                className="block group"
              >
                <div className="flex items-center gap-4 p-4 rounded-lg border dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
                  {/* Rank */}
                  <div className="flex-shrink-0">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${getRankBadgeColor(
                        rank
                      )} font-bold text-lg`}
                    >
                      {rank}
                    </div>
                  </div>

                  {/* Rank Icon */}
                  <div className="flex-shrink-0">{getRankIcon(rank)}</div>

                  {/* User Avatar */}
                  <div className="flex-shrink-0">
                    {user.avatar ? (
                      <div className="w-12 h-12 rounded-full relative">
                        <Image
                          fill
                          className="rounded-full object-cover"
                          alt={`${user.name} avatar`}
                          src={
                            process.env.NEXT_PUBLIC_R2_BUCKET_URL +
                            "/" +
                            user.avatar
                          }
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12">
                        <GeneralAvatar />
                      </div>
                    )}
                  </div>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {user.name}
                      </h3>
                      <Badge className="bg-blue-500 text-white text-xs">
                        Commercial
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {user.email}
                    </p>
                    {user.phoneNumber && (
                      <p className="text-sm text-muted-foreground">
                        {user.phoneNumber}
                      </p>
                    )}
                  </div>

                  {/* Godsons Count */}
                  <div className="flex-shrink-0 text-right">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {user.godsonsCount}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          filleul{user.godsonsCount > 1 ? "s" : ""}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
