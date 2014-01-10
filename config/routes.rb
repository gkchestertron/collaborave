Collaborave::Application.routes.draw do
  resources :projects do
    resources :tracks, only: [:index]
  end
  resources :tracks, except: [:index] do
    resources :regions, only: [:index]
  end
  resources :regions, except: [:index]
  resources :notes
  resources :versions
  resources :collabs
  root to: 'users#index'
end
