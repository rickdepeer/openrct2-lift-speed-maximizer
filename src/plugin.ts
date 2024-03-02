/// <reference path="../lib/openrct2.d.ts" />

const ridesAlreadySet: number[] = [];

const main = function () {
	ui.registerMenuItem("Lift Speed Maximizer", function () {
		let error = null;
		try {
			setMaxLiftSpeedForAllRides(true);
		} catch (e) {
			error = e
		} finally {
			if (typeof ui !== "undefined") {
				ui.showError('Lift Speed Maximizer', error instanceof Error ? error.message : 'Max lift hill speeds set for all rides!');
			}
		}
	});

	context.subscribe("interval.day", setMaxLiftSpeedForAllRides)
};

function setMaxLiftSpeedForAllRides(force: boolean = false) {
	map.rides.forEach((ride) => {
		if (force || !ridesAlreadySet.some((id) => ride.id === id)) {
			ride.liftHillSpeed = ride.maxLiftHillSpeed;
			ridesAlreadySet.push(ride.id);
		}
	})
};

registerPlugin({
	name: 'Lift Speed Maximizer',
	version: '1.0',
	authors: ['Rick Fransen'],
	type: 'remote',
	licence: "MIT",
	targetApiVersion: 0,
	main: main
});