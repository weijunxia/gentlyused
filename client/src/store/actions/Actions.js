import {
  CheckUserSession,
  PostRegisterUser,
  PostLoginUser
} from './AuthActions'
import { AddFavorite, RemoveFavorite } from './FavoriteActions'
import {
  SetAWSS3ImageUrl,
  SetUploadFile,
  ToggleImageUpload,
  GetImages,
  GetImageByUser,
  DeleteImageById
} from './ImageActions'
import { PostOrder, RemoveOrder, ToggleOrderModal } from './OrderActions'
import {
  ToggleProductDeleteModal,
  GetAllProductsImages,
  GetAProductsFavorites,
  LoadAllProducts,
  LoadAllProductsAndFavorites,
  LoadProductById,
  LoadProductSearch,
  UpdateUserProduct,
  DeleteUserProduct,
  PostProduct,
  ClearRecentlyAdded
} from './ProductActions'
import { SetStripePayment, ToggleStripeContainer } from './StripeActions'
import {
  LoadAllUsers,
  LoadUserEmailProfile,
  LoadUsernameProfile,
  LoadUserProfileProducts,
  LoadUserFavorites,
  LoadUsersOrders,
  DeleteUserProfile
} from './UserActions'

const allActions = {
  CheckUserSession,
  PostRegisterUser,
  PostLoginUser,
  AddFavorite,
  RemoveFavorite,
  SetAWSS3ImageUrl,
  SetUploadFile,
  ToggleImageUpload,
  GetImages,
  GetImageByUser,
  DeleteImageById,
  PostOrder,
  RemoveOrder,
  ToggleOrderModal,
  ToggleProductDeleteModal,
  GetAllProductsImages,
  GetAProductsFavorites,
  LoadAllProducts,
  LoadAllProductsAndFavorites,
  LoadProductById,
  LoadProductSearch,
  UpdateUserProduct,
  DeleteUserProduct,
  PostProduct,
  ClearRecentlyAdded,
  SetStripePayment,
  ToggleStripeContainer,
  LoadAllUsers,
  LoadUserEmailProfile,
  LoadUsernameProfile,
  LoadUserProfileProducts,
  LoadUserFavorites,
  LoadUsersOrders,
  DeleteUserProfile
}

export default allActions
