import axiosInstance from "./axios";

interface SuggestedFollower {
  id: string;
  name: string;
  avatar: string;
  mutualFriend?: string;
}

interface SuggestedFollowersResponse {
  status: boolean;
  code: number;
  timestamp: string;
  message: string;
  data: SuggestedFollower[];
}

interface FollowResponse {
  status: boolean;
  code: number;
  timestamp: string;
  message: string;
  data: {
    id: string;
    isFollow: boolean;
    isFollowed: boolean;
    createdAt: string;
    user_1: {
      id: string;
      name: string;

      avatar: string;
    };
    user_2: {
      id: string;
      name: string;
      avatar: string;
    };
  };
}

export const followerService = {
  getSuggestedFollowers: async (): Promise<SuggestedFollowersResponse> => {
    try {
      const response = await axiosInstance.get<SuggestedFollowersResponse>(
        "/follower/get-suggested-followers"
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  followUser: async (userId: string): Promise<FollowResponse> => {
    try {
      const response = await axiosInstance.post<FollowResponse>("/follower", {
        userId,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
