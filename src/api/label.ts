import request from "@/utils/request";
import type { Response } from "@/types/dto";
import type { LabelVO, LabelWithCountVO } from "@/types/label";

type LabelType = "category" | "tag";

export const queryAllByTypeAPI: (
  label_type: LabelType,
) => Promise<Response<LabelVO[]>> = (label_type) => {
  return request.get("/label/all", { params: { label_type } });
};

export const queryCategoryLabelWithCountAPI: () => Promise<
  Response<LabelWithCountVO[]>
> = () => {
  return request.get("/label/categories/count");
};

export const queryTagLabelWithCountAPI: () => Promise<
  Response<LabelWithCountVO[]>
> = () => {
  return request.get("/label/tags/count");
};
