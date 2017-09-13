import { computeTempoBuckets } from './compute-tempo-buckets';

export const guess = (channelData: Float32Array, sampleRate: number) => {
    const tempoBuckets = computeTempoBuckets(channelData, sampleRate);

    const { peaks, tempo } = tempoBuckets[0];
    const bpm = Math.round(tempo);
    const secondsPerBeat = 60 / bpm;

    peaks.sort((a, b) => a - b);

    let offset = (peaks[0] / sampleRate);

    while (offset > secondsPerBeat) {
        offset -= secondsPerBeat;
    }

    return {
        bpm,
        offset
    };
};
