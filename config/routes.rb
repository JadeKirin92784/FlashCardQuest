Rails.application.routes.draw do
  devise_for :users

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  root to: "pages#home"

  resources :flashcards, only: [:index, :show, :new, :create, :destroy]
  resources :decks, only: [:index, :show, :new, :create, :destroy, :edit, :update] do
    member do 
      get :quiz
      delete 'remove_flashcard/:flashcard_id', to: 'decks#remove_flashcard', as: 'remove_flashcard'
      patch 'add_flashcards'
      patch 'remove_flashcards'
    end
  end
  
  resources :user_decks, only: [:index, :update, :destroy, :show]

  get 'decks/:id/quiz', to: 'decks#quiz', as: :deck_quiz

end
