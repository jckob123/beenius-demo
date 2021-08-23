import { mount } from "@vue/test-utils";
import UserCard from "@/components/UserCard.vue";

describe("UserCard.vue", () => {
  const wrapper = mount(UserCard, {
    props: {
      usersId: 1,
      userName: "Bret",
      userFullName: "Leanne Graham",
      randomPhotoUrl: "https://via.placeholder.com/150/92c952",
    },
  });
  it("renders users full name", () => {
    expect(wrapper.get(".user-name").text()).toMatch("Leanne Graham");
  });

  it("renders username", () => {
    expect(wrapper.get(".username").text()).toMatch("Bret");
  });

  it("renders image source", () => {
    const img = wrapper.find("#random-photo");
    expect(img.html()).toEqual(
      '<img id="random-photo" src="https://via.placeholder.com/150/92c952">'
    );
  });
});
