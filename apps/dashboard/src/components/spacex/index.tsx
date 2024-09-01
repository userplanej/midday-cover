'use client'
import React, { useState, useEffect, useCallback, useRef } from 'react';

const GRAVITY = 0.05;
const THRUST = 0.3;
const ROTATION_SPEED = 3;
const SCREEN_HEIGHT = 500;
const SCREEN_WIDTH = 500;
const ROCKET_SIZE = 20;
const NUM_POOPS = 10;

export default function SpaceX() {
  console.log(" SpaceX section ")
  const rocketRef = useRef({
    x: SCREEN_WIDTH / 2,
    y: SCREEN_HEIGHT - ROCKET_SIZE * 2,
    velocityX: 0,
    velocityY: 0,
    rotation: 0,
  });

  const keysRef = useRef({
    Space: false,
    ArrowLeft: false,
    ArrowRight: false,
  });

  const [, forceUpdate] = useState({});

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (['Space', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
      e.preventDefault();
      keysRef.current[e.code as keyof typeof keysRef.current] = true;
    }
  }, []);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    if (['Space', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
      e.preventDefault();
      keysRef.current[e.code as keyof typeof keysRef.current] = false;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  useEffect(() => {
    let lastTime = performance.now();

    const simulationLoop = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 16; // Normalize to 60 FPS
      lastTime = currentTime;

      const rocket = rocketRef.current;
      const keys = keysRef.current;
      
      // Apply gravity
      rocket.velocityY += GRAVITY * deltaTime;

      // Apply thrust
      if (keys.Space) {
        const thrustX = Math.sin(rocket.rotation * Math.PI / 180) * THRUST * deltaTime;
        const thrustY = -Math.cos(rocket.rotation * Math.PI / 180) * THRUST * deltaTime;
        rocket.velocityX += thrustX;
        rocket.velocityY += thrustY;
      }

      // Apply rotation
      if (keys.ArrowLeft) rocket.rotation -= ROTATION_SPEED * deltaTime;
      if (keys.ArrowRight) rocket.rotation += ROTATION_SPEED * deltaTime;

      // Update position
      rocket.x += rocket.velocityX * deltaTime;
      rocket.y += rocket.velocityY * deltaTime;

      // Apply drag (air resistance)
      rocket.velocityX *= 0.99;
      rocket.velocityY *= 0.99;

      // Boundary checks with bounce effect
      if (rocket.x < 0 || rocket.x > SCREEN_WIDTH - ROCKET_SIZE) {
        rocket.velocityX = -rocket.velocityX * 0.5;
        rocket.x = rocket.x < 0 ? 0 : SCREEN_WIDTH - ROCKET_SIZE;
      }
      if (rocket.y < 0 || rocket.y > SCREEN_HEIGHT - ROCKET_SIZE) {
        rocket.velocityY = -rocket.velocityY * 0.5;
        rocket.y = rocket.y < 0 ? 0 : SCREEN_HEIGHT - ROCKET_SIZE;
      }

      forceUpdate({});
      requestAnimationFrame(simulationLoop);
    };

    const animationId = requestAnimationFrame(simulationLoop);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const rocket = rocketRef.current;
  const keys = keysRef.current;

  return (
    <div className="relative w-[500px] h-[500px] bg-sky-200 overflow-hidden">
      {[...Array(NUM_POOPS)].map((_, index) => (
        <div
          key={index}
          className="absolute w-4 h-4 bg-yellow-800 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            animation: `fallDown ${15 + Math.random() * 10}s linear ${index * 1.5}s infinite`,
          }}
        />
      ))}
      <div
        className="absolute w-5 h-5 bg-red-500"
        style={{
          transform: `translate(${rocket.x}px, ${rocket.y}px) rotate(${rocket.rotation}deg)`,
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        }}
      />
      {keys.Space && (
        <div
          className="absolute w-3 h-3 bg-orange-500"
          style={{
            transform: `translate(${rocket.x + 1}px, ${rocket.y + 5}px) rotate(${rocket.rotation}deg)`,
            clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)',
          }}
        />
      )}
      <div className="absolute bottom-4 left-4 text-gray-800">
        Use keys to control the rocket:
        <br />
        Space - Thrust
        <br />
        ← → - Rotate
      </div>
      <div className="absolute top-4 left-4 text-gray-800 text-xs">
        X: {rocket.x.toFixed(2)}, Y: {rocket.y.toFixed(2)}
        <br />
        VelX: {rocket.velocityX.toFixed(2)}, VelY: {rocket.velocityY.toFixed(2)}
        <br />
        Rotation: {rocket.rotation.toFixed(2)}
        <br />
        Thrust: {keys.Space ? 'ON' : 'OFF'}
      </div>
      <style jsx>{`
        @keyframes fallDown {
          from {
            transform: translateY(-20px);
          }
          to {
            transform: translateY(520px);
          }
        }
      `}</style>
    </div>
  );
}