class ProfilesController < ApiController
  before_action :require_login, except: [:index, :show]

  def index
    # profiles = Profile.all
    # render json: { profiles: profiles }
  end

  def show
    profile = Profile.find(params[:id])
    profile_user = profile.user
    render json: { profile: profile, username: profile_user.username }
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

  private
  def profile_params
    params.require(:profile).permit(:facebook, :instagram, :google, :linkedin, :twitter)
  end

end
