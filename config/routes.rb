Rails.application.routes.draw do
  root to: 'dashboard#index'
  get 'dashboard/index'
end
