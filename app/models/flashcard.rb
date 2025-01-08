class Flashcard < ApplicationRecord
  validates :question, presence: true
  validates :answer, presence: true
  has_many :deck_cards
  has_many :decks, through: :deck_cards

  after_initialize :init

  def init
    self.question  ||= "default question"
    self.answer ||= "default answer"
  end
  
end
