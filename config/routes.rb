FishCms::Application.routes.draw do

  resources :categories

  resources :artworks

  resources :artists

  resources :awards

  resources :members do
    collection do
      post :sort
    end
  end

  resources :slides do
    collection do
      post :sort
    end
  end
  
  resources :pages  
  resources :categories do
    collection do
      post :sort
    end
  end 
  resources :links
  resources :uploads

  get "home/index"
  get "home/search"
  get "home/news"
  get "home/categories"
  get "admin/index"
  get "home/about"
  get "home/contactus"
  get "home/members"
  get "home/artists"
  get "home/artworks"
  match '/:pinyin', :to => 'artists#show'
  match 'admin',:to=>"admin/index"

  root :to => "home#index"
  
  resources :posts do
    collection do
      get :sta
      get :period
      get :wait_for_be_approved
      post :sort
    end

    post :approve, :on => :member
  end
  
  mount Ckeditor::Engine => '/ckeditor'
  
  devise_for :users, :path_prefix => 'my'
  resources :users

  # The priority is based upon order of creation:
  # first created -> highest priority.


  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => 'welcome#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
