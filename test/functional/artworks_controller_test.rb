require 'test_helper'

class ArtworksControllerTest < ActionController::TestCase
  setup do
    @artwork = artworks(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:artworks)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create artwork" do
    assert_difference('Artwork.count') do
      post :create, artwork: { artist_id: @artwork.artist_id, category_id: @artwork.category_id, click_count: @artwork.click_count, condition_report: @artwork.condition_report, description: @artwork.description, dimensions: @artwork.dimensions, edition: @artwork.edition, exhibition: @artwork.exhibition, listed: @artwork.listed, literature: @artwork.literature, markings: @artwork.markings, medium: @artwork.medium, title: @artwork.title, year: @artwork.year }
    end

    assert_redirected_to artwork_path(assigns(:artwork))
  end

  test "should show artwork" do
    get :show, id: @artwork
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @artwork
    assert_response :success
  end

  test "should update artwork" do
    put :update, id: @artwork, artwork: { artist_id: @artwork.artist_id, category_id: @artwork.category_id, click_count: @artwork.click_count, condition_report: @artwork.condition_report, description: @artwork.description, dimensions: @artwork.dimensions, edition: @artwork.edition, exhibition: @artwork.exhibition, listed: @artwork.listed, literature: @artwork.literature, markings: @artwork.markings, medium: @artwork.medium, title: @artwork.title, year: @artwork.year }
    assert_redirected_to artwork_path(assigns(:artwork))
  end

  test "should destroy artwork" do
    assert_difference('Artwork.count', -1) do
      delete :destroy, id: @artwork
    end

    assert_redirected_to artworks_path
  end
end
