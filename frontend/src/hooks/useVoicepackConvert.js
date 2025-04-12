import { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

const useVoiceConvert = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const convertVoice = async (voicePackName, audioBlob, userId) => {
    if (!voicePackName || !audioBlob) {
      alert('보이스팩 이름과 녹음 파일이 필요합니다.');
      return;
    }

    const formData = new FormData();
    formData.append('userId', 7); // ✅ userId를 동적으로 받도록 수정
    formData.append('name', voicePackName);
    formData.append('voiceFile', new File([audioBlob], 'voice.wav', { type: 'audio/wav' }));

    console.log('✅ userId:', userId); // 현재는 하드코딩 7 → OK
    console.log('✅ name:', voicePackName); // 비어 있으면 ❌
    console.log('✅ audioBlob:', audioBlob); // size가 0이면 ❌
    console.log('✅ voiceFile File 객체:', new File([audioBlob], 'voice.wav', { type: 'audio/wav' }));

    const url = 'voicepack/convert';
    console.log('🌐 전송할 API URL:', axiosInstance.defaults.baseURL + url);

    try {
      setLoading(true);
      setError(null);

      const response = await axiosInstance.post(url, formData, {
        withCredentials: true,
      });

      return response.data;
    } catch (err) {
      console.error('보이스팩 변환 오류:', err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { convertVoice, loading, error };
};

export default useVoiceConvert;
