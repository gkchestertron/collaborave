Collaborave::Application.routes.draw do
  resources :projects do
    resources :versions, only: [:index]
    resources :notes
    resources :collabs
  end

  resources :versions, except: [:index] do
    resources :tracks, only: [:index]
  end

  resources :tracks, except: [:index] do
    resources :regions, only: [:index]
  end

  resources :regions, except: [:index]
  

  resources :users
  resources :sessions, only: [:new, :create, :destroy]
  resources :projects
  root 'static_pages#home'
  match 'signup', to: 'users#new', via: 'get'
  match '/signin',  to: 'sessions#new',         via: 'get'
  match '/signout', to: 'sessions#destroy',     via: 'delete'
  match '/help', to: 'static_pages#help', via: 'get'
  match '/about', to: 'static_pages#about', via: 'get'
  match '/contact', to: 'static_pages#contact', via: 'get'
end
