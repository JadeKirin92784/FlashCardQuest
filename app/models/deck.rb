class Deck < ApplicationRecord
  has_many :flashcards, through: :deck_cards
  has_many :users, through: :user_decks
end
