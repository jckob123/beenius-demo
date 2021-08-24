import { shallowMount } from "@vue/test-utils";
import AlbumCard from "@/components/AlbumCard.vue";

describe("AlbumCard.vue", () => {
  const wrapper = shallowMount(AlbumCard, {
    props: {
      albumTitle: "Test",
    },
  });

  it("renders users full name", () => {
    expect(wrapper.get("span").text()).toMatch("Test");
  });
});
