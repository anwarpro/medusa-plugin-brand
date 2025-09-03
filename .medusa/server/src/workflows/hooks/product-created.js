"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productCreatedHookHandler = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const utils_1 = require("@medusajs/framework/utils");
const brand_1 = require("../../modules/brand");
const productCreatedHookHandler = async ({ products, additional_data }, { container }) => {
    if (!additional_data?.brand_id) {
        return new workflows_sdk_1.StepResponse([], []);
    }
    const brandModuleService = container.resolve(brand_1.BRAND_MODULE);
    await brandModuleService.retrieveBrand(additional_data.brand_id);
    const remoteLink = container.resolve("remoteLink");
    const logger = container.resolve("logger");
    const links = [];
    for (const product of products) {
        links.push({
            [utils_1.Modules.PRODUCT]: {
                product_id: product.id,
            },
            [brand_1.BRAND_MODULE]: {
                brand_id: additional_data.brand_id,
            },
        });
    }
    await remoteLink.create(links);
    logger.info("Linked brand to products");
    return new workflows_sdk_1.StepResponse(links, links);
};
exports.productCreatedHookHandler = productCreatedHookHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1jcmVhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3dvcmtmbG93cy9ob29rcy9wcm9kdWN0LWNyZWF0ZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBS0EscUVBQStEO0FBQy9ELHFEQUE2RTtBQUU3RSwrQ0FBaUQ7QUFHMUMsTUFBTSx5QkFBeUIsR0FBRyxLQUFLLEVBQUUsRUFBQyxRQUFRLEVBQUUsZUFBZSxFQUFDLEVBQUUsRUFBQyxTQUFTLEVBQUMsRUFBRSxFQUFFO0lBQ3hGLElBQUksQ0FBQyxlQUFlLEVBQUUsUUFBUSxFQUFFLENBQUM7UUFDN0IsT0FBTyxJQUFJLDRCQUFZLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCxNQUFNLGtCQUFrQixHQUNwQixTQUFTLENBQUMsT0FBTyxDQUFDLG9CQUFZLENBQUMsQ0FBQztJQUNwQyxNQUFNLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsUUFBa0IsQ0FBQyxDQUFDO0lBRTNFLE1BQU0sVUFBVSxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDbkQsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUUzQyxNQUFNLEtBQUssR0FBcUIsRUFBRSxDQUFDO0lBRW5DLEtBQUssTUFBTSxPQUFPLElBQUksUUFBUSxFQUFFLENBQUM7UUFDN0IsS0FBSyxDQUFDLElBQUksQ0FBQztZQUNQLENBQUMsZUFBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNmLFVBQVUsRUFBRSxPQUFPLENBQUMsRUFBRTthQUN6QjtZQUNELENBQUMsb0JBQVksQ0FBQyxFQUFFO2dCQUNaLFFBQVEsRUFBRSxlQUFlLENBQUMsUUFBUTthQUNyQztTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxNQUFNLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFL0IsTUFBTSxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0lBRXhDLE9BQU8sSUFBSSw0QkFBWSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztBQUMxQyxDQUFDLENBQUE7QUE5QlksUUFBQSx5QkFBeUIsNkJBOEJyQyJ9