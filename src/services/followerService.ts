import axiosInstance from "./axios";

export interface SuggestedFollower {
  id: string;
  name: string;
  avatar: string | null;
  mutualFriend: string;
  createdAt: string;
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
  getSuggestedFollowers: async (page: number = 1): Promise<SuggestedFollowersResponse> => {
    try {
      const response = await axiosInstance.get<SuggestedFollowersResponse>(
        `/follower/get-suggested-followers?page=${page}`
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

  unfollowUser: async (userId: string): Promise<FollowResponse> => {
    try {
      const response = await axiosInstance.patch<FollowResponse>(`/follower/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
