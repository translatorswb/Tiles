import Vuetify from "vuetify";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import VBorderedCard from "../VBorderedCard.vue";

const mountFunction = options => {
  const localVue = createLocalVue();
  const vuetify = new Vuetify();
  return shallowMount(VBorderedCard, {
    localVue,
    vuetify,
    ...options,
  })
}

describe("VBorderedCard", () => {
  test("renders the slot with text", () => {
    const wrapper = mountFunction({
      slots: {
        default: "Card content"
      }
    });
    expect(wrapper.text()).toContain("Card content");
  })

  test("renders the slot with template string", () => {
    const wrapper = mountFunction({
      slots: {
        default: "<div class='bordered-card-content'>Card Content</div>"
      }
    });
    expect(wrapper.find(".bordered-card-content").exists()).toBe(true);
  })

  test("renders the slot with another component", () => {
    const Foo = {
      name: 'foo-component',
      template: '<p>Foo</p>'
    }

    const wrapper = mountFunction({
      slots: {
        default: Foo
      }
    });
    expect(wrapper.find(Foo).is(Foo)).toBe(true);
  })

  test("navigates to 'to' when clicked if 'to' exists", () => {
    const mocks = {
      $router: {
        push: jest.fn()
      }
    };
    const wrapper = mountFunction({
      propsData: {
        to: "/"
      },
      mocks
    });
    wrapper.trigger("click");
    expect(mocks.$router.push).toHaveBeenCalledWith("/");
  });

  test("emits 'click' event when clicked if 'to' doesn't exist", () => {
    const wrapper = mountFunction();
    wrapper.trigger("click");
    expect(wrapper.emitted("click")).toHaveLength(1);
  });

  test("renders correctly", () => {
    const wrapper = mountFunction();
    expect(wrapper.element).toMatchSnapshot();
  })
});