"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productUpdatedHookHandler = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const utils_1 = require("@medusajs/framework/utils");
const brand_1 = require("../../modules/brand");
const productUpdatedHookHandler = async ({ products, additional_data }, { container }) => {
    if (additional_data?.brand_id) {
        const brandModuleService = container.resolve(brand_1.BRAND_MODULE);
        await brandModuleService.retrieveBrand(additional_data.brand_id);
        const remoteLink = container.resolve("remoteLink");
        const logger = container.resolve("logger");
        const links = [];
        if (additional_data.old_brand_id) {
            await remoteLink.dismiss({
                [utils_1.Modules.PRODUCT]: {
                    product_id: products.map((product) => product.id),
                },
                [brand_1.BRAND_MODULE]: {
                    brand_id: additional_data.old_brand_id,
                },
            });
        }
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
    }
    const query = container.resolve("query");
    const remoteLink = container.resolve(utils_1.ContainerRegistrationKeys.LINK);
    for (let product of products) {
        const { data: prod } = await query.graph({
            entity: "product",
            fields: ["*", "sales_channels.*"],
            filters: {
                id: product.id,
            },
        });
        const { data: store } = await query.graph({
            entity: "store",
            fields: ["*", "default_sales_channel_id"],
        });
        if (!prod[0].sales_channels?.some((e) => store[0].default_sales_channel_id == e?.id)) {
            const links = {
                [utils_1.Modules.PRODUCT]: {
                    product_id: product.id,
                },
                [utils_1.Modules.SALES_CHANNEL]: {
                    sales_channel_id: store[0].default_sales_channel_id,
                },
            };
            const createdLinks = await remoteLink.create(links);
        }
    }
};
exports.productUpdatedHookHandler = productUpdatedHookHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC11cGRhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3dvcmtmbG93cy9ob29rcy9wcm9kdWN0LXVwZGF0ZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUVBQStEO0FBQy9ELHFEQUE2RTtBQUU3RSwrQ0FBaUQ7QUFHMUMsTUFBTSx5QkFBeUIsR0FBRyxLQUFLLEVBQUUsRUFBQyxRQUFRLEVBQUUsZUFBZSxFQUFDLEVBQUUsRUFBQyxTQUFTLEVBQUMsRUFBRSxFQUFFO0lBQ3hGLElBQUksZUFBZSxFQUFFLFFBQVEsRUFBRSxDQUFDO1FBQzVCLE1BQU0sa0JBQWtCLEdBQ3BCLFNBQVMsQ0FBQyxPQUFPLENBQUMsb0JBQVksQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sa0JBQWtCLENBQUMsYUFBYSxDQUNsQyxlQUFlLENBQUMsUUFBa0IsQ0FDckMsQ0FBQztRQUVGLE1BQU0sVUFBVSxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbkQsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUUzQyxNQUFNLEtBQUssR0FBcUIsRUFBRSxDQUFDO1FBQ25DLElBQUksZUFBZSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQy9CLE1BQU0sVUFBVSxDQUFDLE9BQU8sQ0FBQztnQkFDckIsQ0FBQyxlQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQ2YsVUFBVSxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7aUJBQ3BEO2dCQUNELENBQUMsb0JBQVksQ0FBQyxFQUFFO29CQUNaLFFBQVEsRUFBRSxlQUFlLENBQUMsWUFBaUM7aUJBQzlEO2FBQ0osQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUVELEtBQUssTUFBTSxPQUFPLElBQUksUUFBUSxFQUFFLENBQUM7WUFDN0IsS0FBSyxDQUFDLElBQUksQ0FBQztnQkFDUCxDQUFDLGVBQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtvQkFDZixVQUFVLEVBQUUsT0FBTyxDQUFDLEVBQUU7aUJBQ3pCO2dCQUNELENBQUMsb0JBQVksQ0FBQyxFQUFFO29CQUNaLFFBQVEsRUFBRSxlQUFlLENBQUMsUUFBUTtpQkFDckM7YUFDSixDQUFDLENBQUM7UUFDUCxDQUFDO1FBRUQsTUFBTSxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRS9CLE1BQU0sQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQztRQUV4QyxPQUFPLElBQUksNEJBQVksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUNELE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDekMsTUFBTSxVQUFVLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxpQ0FBeUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUVyRSxLQUFLLElBQUksT0FBTyxJQUFJLFFBQVEsRUFBRSxDQUFDO1FBQzNCLE1BQU0sRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFDLEdBQUcsTUFBTSxLQUFLLENBQUMsS0FBSyxDQUFDO1lBQ25DLE1BQU0sRUFBRSxTQUFTO1lBQ2pCLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRSxrQkFBa0IsQ0FBQztZQUNqQyxPQUFPLEVBQUU7Z0JBQ0wsRUFBRSxFQUFFLE9BQU8sQ0FBQyxFQUFFO2FBQ2pCO1NBQ0osQ0FBQyxDQUFDO1FBQ0gsTUFBTSxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsR0FBRyxNQUFNLEtBQUssQ0FBQyxLQUFLLENBQUM7WUFDcEMsTUFBTSxFQUFFLE9BQU87WUFDZixNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsMEJBQTBCLENBQUM7U0FDNUMsQ0FBQyxDQUFDO1FBQ0gsSUFDSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUN6QixDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLHdCQUF3QixJQUFJLENBQUMsRUFBRSxFQUFFLENBQ3BELEVBQ0gsQ0FBQztZQUNDLE1BQU0sS0FBSyxHQUFHO2dCQUNWLENBQUMsZUFBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUNmLFVBQVUsRUFBRSxPQUFPLENBQUMsRUFBRTtpQkFDekI7Z0JBQ0QsQ0FBQyxlQUFPLENBQUMsYUFBYSxDQUFDLEVBQUU7b0JBQ3JCLGdCQUFnQixFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyx3QkFBd0I7aUJBQ3REO2FBQ0osQ0FBQztZQUNGLE1BQU0sWUFBWSxHQUFHLE1BQU0sVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4RCxDQUFDO0lBQ0wsQ0FBQztBQUNMLENBQUMsQ0FBQTtBQXZFWSxRQUFBLHlCQUF5Qiw2QkF1RXJDIn0=