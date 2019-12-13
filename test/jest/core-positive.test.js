import { initializeVerificationEnvironment, getVerificationOutputFor } from './common';

describe('Route verification - positive', () => {
    beforeAll(() => {
        initializeVerificationEnvironment();
    });

    test('Regular path', async () => {
        const { verificationStatus } = await getVerificationOutputFor('01-regular');

        expect(verificationStatus.singlePath.valid).toEqual(true);
        expect(verificationStatus.pathLength.value).toBeWithinRange(52, 0.5);
        expect(verificationStatus.routeType.valid).toEqual(true);
        expect(verificationStatus.routeType.value).toEqual(0);
        expect(verificationStatus.numberOfStations.valid).toEqual(true);
        expect(verificationStatus.stationsOrder.valid).toEqual(true);
        expect(verificationStatus.stationsOnPath.valid).toEqual(true);
        expect(verificationStatus.elevationGain.value).toBeWithinRange(350, 50);
        expect(verificationStatus.elevationLoss.value).toBeWithinRange(390, 50);
        expect(verificationStatus.elevationTotalChange.value).toBeWithinRange(750, 50);
    });

    test('Circular route', async () => {
        const { verificationStatus } = await getVerificationOutputFor('02-circular');
        expect(verificationStatus.singlePath.valid).toEqual(true);
        expect(verificationStatus.pathLength.value).toBeWithinRange(37, 0.5);
        expect(verificationStatus.routeType.valid).toEqual(true);
        expect(verificationStatus.routeType.value).toEqual(0);
        expect(verificationStatus.numberOfStations.valid).toEqual(true);
        expect(verificationStatus.stationsOrder.valid).toEqual(true);
        expect(verificationStatus.stationsOnPath.valid).toEqual(true);
        expect(verificationStatus.elevationGain.value).toBeWithinRange(1580, 50);
        expect(verificationStatus.elevationLoss.value).toBeWithinRange(1580, 50);
        expect(verificationStatus.elevationTotalChange.value).toBeWithinRange(3160, 50);
    });

    // FIXME: Change to negative or update position
    test('Zero-leading station numbers', async () => {
        const { verificationStatus } = await getVerificationOutputFor('03-zero_leading');
        expect(verificationStatus.singlePath.valid).toEqual(true);
        expect(verificationStatus.pathLength.value).toBeWithinRange(76, 0.5);
        expect(verificationStatus.routeType.valid).toEqual(true);
        expect(verificationStatus.routeType.value).toEqual(0);
        expect(verificationStatus.numberOfStations.valid).toEqual(true);
        expect(verificationStatus.stationsOrder.valid).toEqual(true);
        expect(verificationStatus.stationsOnPath.valid).toEqual(false);
        expect(verificationStatus.elevationGain.value).toBeWithinRange(1610, 100);
        expect(verificationStatus.elevationLoss.value).toBeWithinRange(1380, 100);
        expect(verificationStatus.elevationTotalChange.value).toBeWithinRange(3000, 100);
    });

    test('Route with shared parts #1', async () => {
        const { verificationStatus } = await getVerificationOutputFor('04-shared_parts');
        expect(verificationStatus.singlePath.valid).toEqual(true);
        expect(verificationStatus.pathLength.value).toBeWithinRange(49, 0.5);
        expect(verificationStatus.routeType.valid).toEqual(true);
        expect(verificationStatus.routeType.value).toEqual(0);
        expect(verificationStatus.numberOfStations.valid).toEqual(true);
        expect(verificationStatus.stationsOrder.valid).toEqual(true);
        expect(verificationStatus.stationsOnPath.valid).toEqual(true);
        expect(verificationStatus.elevationGain.value).toBeWithinRange(390, 100);
        expect(verificationStatus.elevationLoss.value).toBeWithinRange(395, 100);
        expect(verificationStatus.elevationTotalChange.value).toBeWithinRange(785, 100);
    });

    test('Route with shared parts #2', async () => {
        const { verificationStatus } = await getVerificationOutputFor('05-shared_parts');
        expect(verificationStatus.singlePath.valid).toEqual(true);
        expect(verificationStatus.pathLength.value).toBeWithinRange(53, 0.5);
        expect(verificationStatus.routeType.valid).toEqual(true);
        expect(verificationStatus.routeType.value).toEqual(0);
        expect(verificationStatus.numberOfStations.valid).toEqual(true);
        expect(verificationStatus.stationsOrder.valid).toEqual(true);
        expect(verificationStatus.stationsOnPath.valid).toEqual(true);
        expect(verificationStatus.elevationGain.value).toBeWithinRange(410, 100);
        expect(verificationStatus.elevationLoss.value).toBeWithinRange(410, 100);
        expect(verificationStatus.elevationTotalChange.value).toBeWithinRange(820, 100);
    });

    test('Stations in reversed order comparing to path direction', async () => {
        const { verificationStatus } = await getVerificationOutputFor('06-reversed_path');
        expect(verificationStatus.singlePath.valid).toEqual(true);
        expect(verificationStatus.pathLength.value).toBeWithinRange(44, 0.5);
        expect(verificationStatus.routeType.valid).toEqual(true);
        expect(verificationStatus.routeType.value).toEqual(0);
        expect(verificationStatus.numberOfStations.valid).toEqual(true);
        expect(verificationStatus.stationsOrder.valid).toEqual(true);
        expect(verificationStatus.stationsOnPath.valid).toEqual(true);
        expect(verificationStatus.elevationGain.value).toBeWithinRange(920, 100);
        expect(verificationStatus.elevationLoss.value).toBeWithinRange(880, 100);
        expect(verificationStatus.elevationTotalChange.value).toBeWithinRange(1800, 100);
    });

    test('Circular path', async () => {
        const { verificationStatus } = await getVerificationOutputFor('12-circular_path');
        expect(verificationStatus.singlePath.valid).toEqual(true);
        expect(verificationStatus.pathLength.value).toBeWithinRange(37, 0.5);
        expect(verificationStatus.routeType.valid).toEqual(true);
        expect(verificationStatus.routeType.value).toEqual(0);
        expect(verificationStatus.numberOfStations.valid).toEqual(true);
        expect(verificationStatus.stationsOrder.valid).toEqual(true);
        expect(verificationStatus.stationsOnPath.valid).toEqual(true);
        expect(verificationStatus.elevationGain.value).toBeWithinRange(1600, 100);
        expect(verificationStatus.elevationLoss.value).toBeWithinRange(1600, 100);
        expect(verificationStatus.elevationTotalChange.value).toBeWithinRange(3200, 100);
    });

    // FIXME: Currently it is positive, unrecognized points are not counted as stations
    test('15 stations', async () => {
        const { verificationStatus } = await getVerificationOutputFor('22-15_stations');
        expect(verificationStatus.singlePath.valid).toEqual(true);
        expect(verificationStatus.pathLength.value).toBeWithinRange(40, 1);
        expect(verificationStatus.routeType.valid).toEqual(true);
        expect(verificationStatus.routeType.value).toEqual(0);
        expect(verificationStatus.numberOfStations.valid).toEqual(true);
        expect(verificationStatus.stationsOrder.valid).toEqual(true);
        expect(verificationStatus.stationsOnPath.valid).toEqual(true);
        expect(verificationStatus.elevationGain.value).toBeWithinRange(313, 50);
        expect(verificationStatus.elevationLoss.value).toBeWithinRange(314, 50);
        expect(verificationStatus.elevationTotalChange.value).toBeWithinRange(627, 50);
    });

    test('Short distance between station 1 and 14', async () => {
        const { verificationStatus } = await getVerificationOutputFor('24-Short_distance_between_1_14');
        expect(verificationStatus.singlePath.valid).toEqual(true);
        expect(verificationStatus.pathLength.value).toBeWithinRange(40, 1);
        expect(verificationStatus.routeType.valid).toEqual(true);
        expect(verificationStatus.routeType.value).toEqual(0);
        expect(verificationStatus.numberOfStations.valid).toEqual(true);
        expect(verificationStatus.stationsOrder.valid).toEqual(true);
        expect(verificationStatus.stationsOnPath.valid).toEqual(true);
        expect(verificationStatus.elevationGain.value).toBeWithinRange(327, 50);
        expect(verificationStatus.elevationLoss.value).toBeWithinRange(328, 50);
        expect(verificationStatus.elevationTotalChange.value).toBeWithinRange(650, 50);
    });

    test('Eight-shaped route', async () => {
        const { verificationStatus } = await getVerificationOutputFor('25-eight_shaped_route');
        expect(verificationStatus.singlePath.valid).toEqual(true);
        expect(verificationStatus.pathLength.value).toBeWithinRange(52, 1);
        expect(verificationStatus.routeType.valid).toEqual(true);
        expect(verificationStatus.routeType.value).toEqual(0);
        expect(verificationStatus.numberOfStations.valid).toEqual(true);
        expect(verificationStatus.stationsOrder.valid).toEqual(true);
        expect(verificationStatus.stationsOnPath.valid).toEqual(true);
        expect(verificationStatus.elevationGain.value).toBeWithinRange(385, 50);
        expect(verificationStatus.elevationLoss.value).toBeWithinRange(385, 50);
        expect(verificationStatus.elevationTotalChange.value).toBeWithinRange(750, 50);
    });
});