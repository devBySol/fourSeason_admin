module.exports = {
  async beforeCreate(event) {
    const { data } = event.params;

    const { activity, time } = data;

    const existingReservations = await strapi.entityService.count("api::reservation.reservation", {
      filters: {
        activity: activity,
        time: time,
      },
    });

    if (existingReservations >= 15) {
      throw new Error("This activity is fully booked for the selected time.");
    }
  },
  async beforeDelete(event) {
    console.log("Before delete:", event.params);
  },
  async afterDelete(event) {
    console.log("After delete:", event.result);
  },
};
