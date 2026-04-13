import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ReportsService {
  constructor(private http: HttpClient) {}

  // 1. Get paginated survey list for reports
  getSurveysForReport(offset: number = 0, limit: number = 10): Observable<SurveyReportListResponse> {
    const params = new HttpParams()
      .set('offset', offset.toString())
      .set('limit', limit.toString());
    return this.http.get<SurveyReportListResponse>('/api/survey/getSurveysForReport', { params }).pipe(
      catchError(() => of({ surveys: [], noOfSurveys: 0 }))
    );
  }

  // 2. Search surveys for report
  searchSurveysForReport(keyword: string, offset: number = 0, limit: number = 10): Observable<SurveyReportListResponse> {
    const params = new HttpParams()
      .set('keyWord', keyword)
      .set('offset', offset.toString())
      .set('limit', limit.toString());
    return this.http.get<SurveyReportListResponse>('/api/survey/searchSurveysForReport', { params }).pipe(
      catchError(() => of({ surveys: [], noOfSurveys: 0 }))
    );
  }

  // 3. Get filter options for a survey
  getFiltersForSurveyReport(surveyId: number): Observable<GetFiltersResponse> {
    const params = new HttpParams().set('surveyId', surveyId.toString());
    return this.http.get<GetFiltersResponse>('/api/survey/getFiltersForSurveyReport', { params }).pipe(
      catchError(() => of({ isPremium: false, filters: [] }))
    );
  }

  // 4. Download survey report (opens in new window)
  downloadSurveyReport(surveyId: number, reportType: string = 'all', authToken: string = ''): void {
    const url = `/api/survey/getSurveyReport?surveyId=${surveyId}&reportType=${reportType}&auth=${authToken}`;
    window.open(url, '_blank');
  }

  // 5. Get processed sentiment data
  getProcessedSentiments(surveyId: number): Observable<SentimentResponse> {
    const params = new HttpParams().set('surveyId', surveyId.toString());
    return this.http.get<SentimentResponse>('/pulse/api/v1/survey/getProcessedSentiments', { params }).pipe(
      catchError(() => of({
        sentiments: { overallScore: 0, positive: 0, neutral: 0, negative: 0, positiveCount: 0, negativeCount: 0, neutralCount: 0 }
      }))
    );
  }

  // 6. Get AI-generated overall sentiment summary
  getOverallSentiment(surveyId: number): Observable<any> {
    const params = new HttpParams().set('surveyId', surveyId.toString());
    return this.http.get<any>('/pulse/api/v1/survey/getOverallSentimentBySurveyId', { params }).pipe(
      catchError(() => of(null))
    );
  }

  // 7. Get feedback comment count
  getFeedbackCount(surveyId: number): Observable<{ count: number }> {
    const params = new HttpParams().set('surveyId', surveyId.toString());
    return this.http.get<{ count: number }>('/pulse/api/v1/survey/getFeedbackCount', { params }).pipe(
      catchError(() => of({ count: 0 }))
    );
  }

  // 8. Get survey comments
  getSurveyComments(surveyId: number, filters?: any): Observable<SurveyCommentsResponse> {
    let params = new HttpParams().set('surveyId', surveyId.toString());
    if (filters?.segmentValue) params = params.set('segmentValue', filters.segmentValue);
    if (filters?.filterBy) params = params.set('filterBy', filters.filterBy);
    if (filters?.filterByValues) params = params.set('filterByValues', filters.filterByValues);
    if (filters?.sentimentValue) params = params.set('sentimentValue', filters.sentimentValue);
    return this.http.get<SurveyCommentsResponse>('/pulse/api/v2/survey/getSurveyComments', { params }).pipe(
      catchError(() => of({ sentiments: null, comments: [], totalFilteredComments: 0, readStatusValues: null }))
    );
  }

  // 9. Get word cloud image
  getWordCloudImage(surveyId: number, questionId: string): Observable<Blob> {
    const params = new HttpParams()
      .set('surveyId', surveyId.toString())
      .set('questionId', questionId);
    return this.http.get('/pulse/api/v1/survey/getWordCloudImage', { params, responseType: 'blob' });
  }
}

// Interfaces
export interface SurveyReportItem {
  id: number;
  name: string;
  status: string;
  startDate: string;
  endDate: string;
  type: string;
  selectedCategory?: string;
}

export interface SurveyReportListResponse {
  surveys: SurveyReportItem[];
  noOfSurveys: number;
}

export interface SurveyReportFilter {
  filterName: string;
  filterValue: string;
}

export interface GetFiltersResponse {
  isPremium: boolean;
  filters: SurveyReportFilter[];
}

export interface SentimentResponse {
  sentiments: {
    overallScore: number;
    positive: number;
    neutral: number;
    negative: number;
    positiveCount: number;
    negativeCount: number;
    neutralCount: number;
  };
}

export interface SurveyComment {
  id: number;
  comment: string;
  sentiment: string;
  questionText?: string;
  createdAt?: string;
}

export interface SurveyCommentsResponse {
  sentiments: any;
  comments: SurveyComment[];
  totalFilteredComments: number;
  readStatusValues: any;
}
