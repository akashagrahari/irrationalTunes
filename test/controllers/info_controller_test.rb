require 'test_helper'

class InfoControllerTest < ActionController::TestCase
  test "should get intro" do
    get :intro
    assert_response :success
  end

  test "should get about" do
    get :about
    assert_response :success
  end

  test "should get support" do
    get :support
    assert_response :success
  end

end
