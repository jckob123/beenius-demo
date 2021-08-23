import { mount } from "@vue/test-utils";
import AlbumCard from "@/components/AlbumCard.vue";

describe("AlbumCard.vue", () => {
  const wrapper = mount(AlbumCard, {
    props: {
      albumTitle: "",
    },
  });
  it("renders users full name", () => {
    expect(wrapper.get(".user-name").text()).toMatch("Leanne Graham");
  });

  it("renders image source", () => {
    const img = wrapper.find("#random-photo");
    expect(img.html()).toEqual(
      '<img id="random-photo" src="https://via.placeholder.com/150/92c952">'
    );
  });
});
