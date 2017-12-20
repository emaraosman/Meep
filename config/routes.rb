Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  post   "/login"       => "sessions#create"
  delete "/logout"      => "sessions#destroy"
  get "/sessions"        => "users#sessions"
  resources :users, only: [:new, :create, :show]
  resources :profiles, only: [ :update]
  get "/user/:username" => "profiles#show"
  get "/:username" => "profiles#show"

end
