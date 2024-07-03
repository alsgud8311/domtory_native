interface PostDetailType {
  id: number;
  status: string; // 해당 유저의 status
  board: number; // 게시판 ID
  comment_cnt: number; // 댓글 개수
  post_image?: {
    id: number;
    image_url: string;
    is_deleted: boolean; // 삭제 여부
    is_thumbnail: boolean;
    post: number;
  }[];
  comment?: {
    id: number;
    status: string; // 해당 유저의 status
    member: number;
    anonymous_number: number;
    body: string;
    created_at: string;
    is_blocked: boolean;
    is_deleted: boolean;
    reply?: {
      id: number;
      member: number;
      parent: number;
      body: string;
      anonymous_number: number;
      created_at: string;
      is_blocked: boolean;
      is_deleted: boolean;
      likes_cnt: number;
      is_liked: boolean;
    }[];
    is_liked: boolean;
    likes_cnt: number;
  }[];
  title: string;
  body: string;
  created_at: string;
  is_blocked: boolean;
  is_deleted: boolean;
  thumbnail_url: string | null;
  member: number;
  is_bookmarked: boolean; // 스크랩 여부
  is_liked: boolean; // 좋아요 여부
  likes_cnt: number; // 좋아요 개수
  bookmark_cnt: number; // 스크랩 개수
  owner: boolean; // 해당 게시글 작성자일 경우 true
  date: string;
}

// export const postDetailDefault = {
//   id: "",
//   status: "", // 해당 유저의 status
//   board: 0, // 게시판 ID
//   comment_cnt: number; // 댓글 개수
//   post_image?: {
//     id: number;
//     image_url: string;
//     is_deleted: boolean; // 삭제 여부
//     is_thumbnail: boolean;
//     post: number;
//   }[];
//   comment?: {
//     id: number;
//     status: string; // 해당 유저의 status
//     member: number;
//     anonymous_number: number;
//     body: string;
//     created_at: string;
//     is_blocked: boolean;
//     is_deleted: boolean;
//     reply?: {
//       id: number;
//       member: number;
//       parent: number;
//       body: string;
//       anonymous_number: number;
//       created_at: string;
//       is_blocked: boolean;
//       is_deleted: boolean;
//       likes_cnt: number;
//       is_liked: boolean;
//     }[];
//     is_liked: boolean;
//     likes_cnt: number;
//   }[];

//   title: string;
//   body: string;
//   created_at: string;
//   is_blocked: boolean;
//   is_deleted: boolean;
//   thumbnail_url: string | null;
//   member: number;
//   is_bookmarked: boolean; // 스크랩 여부
//   is_liked: boolean; // 좋아요 여부
//   likes_cnt: number; // 좋아요 개수
//   bookmark_cnt: number; // 스크랩 개수
//   owner: boolean; // 해당 게시글 작성자일 경우 true
// }
