"use client";

import { changeTeamAction } from "@/actions/change-team-action";
import { CreateTeamModal } from "@/components/modals/create-team-modal";
import { Avatar, AvatarFallback, AvatarImage } from "@midday/ui/avatar";
import { Button } from "@midday/ui/button";
import { Dialog } from "@midday/ui/dialog";
import { Icons } from "@midday/ui/icons";
import { useClickAway } from "@uidotdev/usehooks";
import { motion } from "framer-motion";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";

export function TeamDropdown({ selectedTeamId: initialId, teams }) {
  const [selectedId, setSelectedId] = useState(initialId);
  const [isActive, setActive] = useState(false);
  const [isOpen, onOpenChange] = useState(false);
  const changeTeam = useAction(changeTeamAction);

  const sortedTeams = [...teams, { team: { id: "add" } }].sort((a, b) => {
    if (a.team.id === selectedId) return -1;
    if (b.team.id === selectedId) return 1;

    return a.team.id - b.team.id;
  });

  const ref = useClickAway(() => {
    setActive(false);
  });

  const toggleActive = () => setActive((prev) => !prev);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <motion.div ref={ref} layout className="w-[32px] h-[32px] relative">
        {sortedTeams.map(({ team }, index) => (
          <motion.div
            key={team.id}
            className="w-[32px] h-[32px] left-0 overflow-hidden absolute"
            style={{ zIndex: -index }}
            initial={{
              scale: `${100 - index * 16}%`,
              y: index * 5,
            }}
            {...(isActive && {
              animate: {
                y: -(32 + 10) * index,
                scale: "100%",
              },
            })}
          >
            {team.id === "add" ? (
              <>
                <Button
                  className="w-[32px] h-[32px]"
                  size="icon"
                  variant="outline"
                  onClick={() => {
                    onOpenChange(true);
                    setActive(false);
                  }}
                >
                  <Icons.Add />
                </Button>

                <CreateTeamModal onOpenChange={onOpenChange} />
              </>
            ) : (
              <Avatar
                className="w-[32px] h-[32px] rounded-sm border border-[#DCDAD2] dark:border-[#2C2C2C] cursor-pointer"
                onClick={() => {
                  if (index === 0) {
                    toggleActive();
                  } else {
                    setSelectedId(team.id);
                    setActive(false);
                    changeTeam.execute({ teamId: team.id, redirectTo: "/" });
                  }
                }}
              >
                <AvatarImage src={team?.logo_url} />
                <AvatarFallback className="rounded-sm w-[32px] h-[32px]">
                  <span className="text-xs">
                    {team?.name?.charAt(0)?.toUpperCase()}
                    {team?.name?.charAt(1)?.toUpperCase()}
                  </span>
                </AvatarFallback>
              </Avatar>
            )}
          </motion.div>
        ))}
      </motion.div>
    </Dialog>
  );
}
