/**
 * reservation controller
 */

import { factories } from "@strapi/strapi";
import { Context } from "koa";

export default factories.createCoreController("api::reservation.reservation", ({ strapi }) => ({
  async delete(ctx: Context) {
    const { id } = ctx.params;

    try {
      // ID 확인
      if (!id) {
        return ctx.badRequest("Reservation ID is required.");
      }

      // 예약 데이터 확인
      const existingReservation = await strapi.db.query("api::reservation.reservation").findOne({
        where: { id: Number(id) },
      });

      if (!existingReservation) {
        return ctx.notFound("Reservation not found.");
      }

      // 삭제 요청 수행
      const result = await strapi.db.query("api::reservation.reservation").delete({
        where: { id: Number(id) },
      });

      // 삭제 확인 및 응답
      if (result) {
        ctx.send({ message: "Reservation deleted successfully", id });
      } else {
        ctx.throw(500, "Failed to delete the reservation.");
      }
    } catch (error) {
      strapi.log.error("Error deleting reservation:", error);
      ctx.throw(500, "An error occurred while deleting the reservation.");
    }
  },
}));
