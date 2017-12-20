class ProfilesController < ApiController
  before_action :require_login, except: [:index, :show]

  def index
    # profiles = Profile.all
    # render json: { profiles: profiles }
  end

  def show
    user = User.find_by(username: params[:username])
    profile = user.profile
    render json: { profile: profile, username: user.username }
  end

  def create
    profile = Profile.new(profile_params)
    profile.user = current_user

    if profile.save
      render json: {
        message: 'ok',
        profile: profile,
      }
    else
      render json: {message: 'Could not create profile'}
    end
  end


  def update
    profile = Profile.find_by(id: params[:id])
    if profile.update(update_params)
      render json: {
        message: 'ok',
        profile: profile,
      }
    else
      render json: {message: 'could not update profile'}
    end
  end

  private
  def profile_params
    params.require(:profile).permit(:facebook, :instagram, :google, :linkedin, :twitter)
  end

  def update_params
    params.require(:profile).permit(:facebook, :instagram, :google, :linkedin, :twitter)
  end

end
