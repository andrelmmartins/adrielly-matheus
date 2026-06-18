"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SITE_CONFIG } from "@/config/site";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(targetDate: Date): TimeLeft {
  const difference = targetDate.getTime() - Date.now();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

const UNITS = [
  { key: "days", label: "dias" },
  { key: "hours", label: "horas" },
  { key: "minutes", label: "minutos" },
  { key: "seconds", label: "segundos" },
] as const;

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const updateCountdown = () => {
      setTimeLeft(calculateTimeLeft(SITE_CONFIG.eventDate));
    };

    updateCountdown();
    setIsReady(true);

    const timer = window.setInterval(updateCountdown, 1000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <Box>
      <Text
        fontSize="sm"
        fontWeight="medium"
        color="sage"
        letterSpacing="widest"
        textTransform="uppercase"
        mb={4}
      >
        Contagem regressiva
      </Text>

      <Flex gap={3} wrap="wrap">
        {UNITS.map((unit) => (
          <Box
            key={unit.key}
            minW="72px"
            textAlign="center"
            bg="peach/60"
            borderRadius="xl"
            px={4}
            py={3}
            backdropFilter="blur(4px)"
          >
            <Text
              fontFamily="heading"
              fontSize="3xl"
              fontWeight="semibold"
              color="slate"
              lineHeight="1"
            >
              {isReady ? pad(timeLeft[unit.key]) : "--"}
            </Text>
            <Text fontSize="xs" color="steel" mt={1} textTransform="lowercase">
              {unit.label}
            </Text>
          </Box>
        ))}
      </Flex>
    </Box>
  );
}
