class UsersController < ApplicationController

 # POST /register
  def register
    @user = User.create(user_params)
   if @user.save
    response = { message: 'User created successfully'}
    render json: response, status: :created
   else
    render json: @user.errors, status: :bad
   end
  end

  private

  def user_params
    params.permit(
      :name,
      :email,
      :password
    )
  end
end
