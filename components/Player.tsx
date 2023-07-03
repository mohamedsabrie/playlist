import { currentTrackIdAtom, isPlayingAtom } from "@/atoms/playlistAtoms";
import useSongInfo from "@/hooks/useSongInfo";
import useSpotify from "@/hooks/useSpotify";
import {
  ArrowPathRoundedSquareIcon,
  ArrowsRightLeftIcon,
  BackwardIcon,
  ForwardIcon,
  PauseCircleIcon,
  PlayCircleIcon,
  SpeakerWaveIcon,
} from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { debounce } from "lodash";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import handleErrors from "@/lib/handleErrors";

function Player() {
  const router = useRouter();
  const [shuffleIsOn, setShuffleIsOn] = useState(false);
  const [repeatIsOn, setRepeatIsOn] = useState("off");
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingAtom);
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdAtom);
  const [volume, setVolume] = useState<number>(50);
  const songInfo: any = useSongInfo();

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data: any) => {
      if (data?.body?.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err: any) => {
            const error = err.body.error;
            if (error.status == 404 && error.reason == "NO_ACTIVE_DEVICE") {
              toast.info(
                "No active device found, Please open your spotify and play a song",
                {
                  position: toast.POSITION.TOP_CENTER,
                }
              );
            }
          });
      }
    });
  };
  const handleVolumeRange = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch((err: any) => {});
    }, 500),
    []
  );

  const toggleShuffle = () => {
    spotifyApi.setShuffle(!shuffleIsOn).then(
      function () {
        setShuffleIsOn((prev) => !prev);
        console.log("Shuffle is on.");
      },
      function (err: any) {
        handleErrors({ err, router });
      }
    );
  };
  const handleRepeat = () => {
    const mode = repeatIsOn == "track" ? "off" : "track";
    spotifyApi.setRepeat(mode).then(
      function () {
        setRepeatIsOn(mode);
      },
      function (err: any) {
        handleErrors({ err, router });
      }
    );
  };

  const fetchCurrentSong = () => {
    spotifyApi
      .getMyCurrentPlayingTrack()
      .then((data: any) => {
        setCurrentTrackId(data?.body?.item?.id);
      })
      .catch((err: any) => {
        handleErrors({ err, router });
      });
    spotifyApi.getMyCurrentPlaybackState().then((data: any) => {
      setIsPlaying(data?.body?.is_playing);
    });
  };
  useEffect(() => {
    if (volume > 0 && volume < 100 && spotifyApi.getAccessToken()) {
      handleVolumeRange(volume);
    }
  }, [volume]);
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [spotifyApi, session]);

  return (
    <div className="h-24 text-white  bg-gradient-to-t from-black to-gray-900 grid grid-cols-3 px-2 md:px-8 text-xs md:text-base">
      <div className="flex items-center space-x-3">
        {songInfo?.album?.images?.[0]?.url && (
          <img
            height={50}
            width={50}
            className=""
            src={songInfo?.album?.images?.[0]?.url}
            alt=""
          />
        )}

        <div className="flex flex-col">
          <p className="font-semibold">{songInfo?.name}</p>
          <p className="text-gray-400 text-xs font-medium">
            {songInfo?.artists?.[0]?.name}
          </p>
        </div>
      </div>

      <div className="flex justify-center  items-center space-x-10">
        <div>
          <ArrowsRightLeftIcon
            onClick={toggleShuffle}
            className={`playBtn ${shuffleIsOn ? "text-primary" : ""}`}
          />
        </div>
        <div>
          <BackwardIcon
            onClick={() =>
              spotifyApi.skipToPrevious().then(
                function () {
                  console.log("Skip to previous");
                },
                function (err: any) {
                  //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
                  toast.error("Something went wrong!", {
                    position: toast.POSITION.TOP_CENTER,
                  });
                }
              )
            }
            className="playBtn"
          />
        </div>
        <div>
          {isPlaying ? (
            <PauseCircleIcon
              onClick={handlePlayPause}
              className="playBtn w-10 h-10"
            />
          ) : (
            <PlayCircleIcon
              onClick={handlePlayPause}
              className="playBtn w-10 h-10"
            />
          )}
        </div>

        <div>
          <ForwardIcon
            onClick={() =>
              spotifyApi.skipToNext().then(
                function () {
                  console.log("Skip to next");
                },
                function (err: any) {
                  //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
                  toast.error("Something went wrong!", {
                    position: toast.POSITION.TOP_CENTER,
                  });
                }
              )
            }
            className="playBtn "
          />
        </div>
        <div>
          <ArrowPathRoundedSquareIcon
            onClick={handleRepeat}
            className={`playBtn ${
              repeatIsOn == "track" ? "text-primary" : ""
            } `}
          />
        </div>
      </div>
      <div className="flex justify-end items-center space-x-4">
        <SpeakerWaveIcon
          onClick={() =>
            setVolume((prev: any) => {
              if (prev > 0 && prev < 100) {
                return prev + 10;
              }
            })
          }
          className="playBtn"
        />
        <input
          value={volume}
          type="range"
          min={0}
          max={100}
          onChange={(e) => setVolume(Number(e.target.value))}
        />
      </div>
    </div>
  );
}

export default Player;
