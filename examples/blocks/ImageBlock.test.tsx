import React from "react";
import { shallow } from "enzyme";

import { DraftUtils } from "../../src/index";

import ImageBlock from "./ImageBlock";

describe("ImageBlock", () => {
  it("renders", () => {
    expect(
      shallow(
        <ImageBlock
          block={{}}
          blockProps={{
            editorState: {},
            entityType: {},
            entity: {
              getData: () => ({
                src: "example.png",
              }),
            },
            onChange: () => {},
          }}
        />,
      ),
    ).toMatchSnapshot();
  });

  it("alt", () => {
    expect(
      shallow(
        <ImageBlock
          block={{}}
          blockProps={{
            editorState: {},
            entityType: {},
            entity: {
              getData: () => ({
                src: "example.png",
                alt: "Test",
              }),
            },
            onChange: () => {},
          }}
        />,
      ),
    ).toMatchSnapshot();
  });

  it("changeAlt", () => {
    jest.spyOn(DraftUtils, "updateBlockEntity");
    DraftUtils.updateBlockEntity.mockImplementation((e) => e);

    const onChange = jest.fn();
    const wrapper = shallow(
      <ImageBlock
        block={{}}
        blockProps={{
          editorState: {},
          entityType: {},
          entity: {
            getData: () => ({
              src: "example.png",
              alt: "Test",
            }),
          },
          onChange,
        }}
      />,
    );

    const currentTarget = document.createElement("input");
    currentTarget.value = "new alt";

    wrapper.find('[type="text"]').simulate("change", { currentTarget });

    expect(onChange).toHaveBeenCalled();
    expect(DraftUtils.updateBlockEntity).toHaveBeenCalledWith(
      expect.any(Object),
      {},
      expect.objectContaining({ alt: "new alt" }),
    );

    jest.restoreAllMocks();
  });
});
