class Flashcard < ApplicationRecord
  validates :question, presence: true
  validates :answer, presence: true

  after_initialize :init

  def init
    self.question  ||= "default question"
    self.answer ||= "default answer"
  end
  
end
